module.exports = {
    name: "ready",
    once: true,
    /**
     * @param { Client } client
     */
    execute(client) {
        console.log("The bot is now ready!")
        client.user.setActivity("/play", {type: "PLAYING"})
    }
}