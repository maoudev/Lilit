const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "Musica",
    options: [
        {
            name: "play",
            description: "Reproduce una canción.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Proporcionar un nombre o una URL para la canción", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Cambia el volumen del reproductor",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true}]

        },
        {
            name: "settings",
            description: "Selecciona una opción",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Selecciona una opción", type: "STRING", required: true, 
            choices: [
                {name: "queue", value:"queue"},
                {name: "skip", value:"skip"},
                {name: "pause", value:"pause"},
                {name: "resume", value:"resume"},
                {name: "stop", value:"stop"},
                {name: "shuffle", value:"shuffle"}
            ]}]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "Tienes que estar en un canal de voz.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `Actualmente estoy reproduciendo musica en <${guild.me.voice.channelId}>`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "🎶 Solicitud recibida."});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 ||Volume <1)
                    return interaction.reply({content: "Tienes que especificar un numero del 1 al 100."});

                    client.distube.setVolume( VoiceChannel, Volume);
                    return interaction.reply({content: `📶 El volumen se ha cambiado a \`${Volume}%\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ La música no está activa"});

                    switch(options.getString("options")) {
                        case "skip" : 
                            await queue.skip(VoiceChannel);
                            return interaction.reply({content: "⏩ La canción ha sido saltada."})
                        case "stop" : 
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: " La música se ha detenido."})
                        case "pause" :
                            await queue.pause(VoiceChannel);
                            return interaction.reply({content: "La música ha sido pausada."})
                        case "resume" :
                            await queue.resume(VoiceChannel);
                            return interaction.reply({content: "⏯ la canción ha sido reanudada"})

                        case "shuffle" :
                            await queue.shuffle(VoiceChannel);
                            return interaction.reply({content: "La lista de reproducción ha sido mezclada"}); 
                            

                        case "queue" :
                            // return interaction.reply({embeds: [new MessageEmbed() //
                            // .setColor("AQUA") //
                            // .setDescription(`${queue.songs.map((song, id) =>  `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}` //
                            // )]}); //

                    }
                    return;
                }
            }











        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }

    }
}