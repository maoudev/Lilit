const client = require("../../index");
const { MessageEmbed } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("39F9FF")
    .setTitle("🎶 Reproduciendo ")
    .setDescription(`\`${song.name}\` - \`${song.formattedDuration}\`\nPedida por: ${song.user}`)]}))

    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("AQUA")
    .setDescription(`🎶 Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`)]}))

    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("39F9FF")
    .setDescription(`🎶 | Added \`${playlist.name}\` to queue}`)]}))

    .on("error", (channel, e) => {
        channel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(` An error encountered: ${e}`)]})
        console.error(e)
    })
    .on("empty", queue => queue.textChannel.send({ content: "¡Desconectado! el canal de voz está vacio."}))

    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`No result found!`)]}))

    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription("Finalizado!")]}))