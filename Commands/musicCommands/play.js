const { CommandInteraction, Client, MessageEmbed } = require("discord.js");


module.exports = {
    name: "play",
    description: "Reproduce una canción.",
    options: [{ name: "query", description: "Proporcionar un nombre o una URL para la canción", type: "STRING", required: true}],
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

        client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
        return interaction.reply({content: "🎶 Solicitud recibida."});
           
    } 
}
