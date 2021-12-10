const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { execute } = require("../Clients/ready");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("🔴 Se produjo un error al ejecutar este comando.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)

        }
    }
}