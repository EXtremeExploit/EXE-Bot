const discord = require('discord.js');
const { Message, Client } = discord;
class invite {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {

        client.generateInvite(['ADMINISTRATOR']).then(link => {
            msg.channel.send(new discord.RichEmbed()
                .setTitle('Invite me to your server!')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setColor([255, 0, 0])
                .setDescription(link)
                .setURL(link));
        });
    }
}
module.exports = invite;
