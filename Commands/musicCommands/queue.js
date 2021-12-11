const { CommandInteraction, Client, MessageEmbed } = require("discord.js");


module.exports = {
    name: "queue",
    description: "Mostrar la lista de reproduccion",
     /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // const { options, member, guild, channel } = interaction;
        // const VoiceChannel = member.voice.channel;
        // const queue = await client.distube.getQueue(VoiceChannel);

        // if(!VoiceChannel)
        // return interaction.reply({content: "Tienes que estar en un canal de voz.", ephemeral: true});

        // if(!queue)
        // return interaction.reply({content: "⛔ No es estas reproduciendo nada."});


        // if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        // return interaction.reply({content: `Actualmente estoy reproduciendo musica en <${guild.me.voice.channelId}>`, ephemeral: true});

        // return interaction.reply({embeds: [new MessageEmbed()
            // .setColor("AQUA")
            // .setAuthor('Lista de reproducción', 'https://cdn.discordapp.com/avatars/918324711992229979/182886b1c2dc6be9806c90d52a967e76.png?size=2048')
            // .setDescription(`${queue.songs.map((song, id) =>  `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
            // )]}); 
        
        return interaction.reply({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription("⚠ Comando en mantención!")]});
    } 
}