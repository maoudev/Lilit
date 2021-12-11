const { CommandInteraction, Client, MessageEmbed } = require("discord.js");


module.exports = {
    name: "stop",
    description: "Detiene la música.",
     /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(VoiceChannel);

        if(!VoiceChannel)
        return interaction.reply({content: "Tienes que estar en un canal de voz.", ephemeral: true});

        if(!queue)
        return interaction.reply({content: "⛔ No es estas reproduciendo nada."});


        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `Actualmente estoy reproduciendo musica en <${guild.me.voice.channelId}>`, ephemeral: true});

        await queue.stop(VoiceChannel);
        return interaction.reply({content: "La música se ha detenido."})
           
    } 
}
