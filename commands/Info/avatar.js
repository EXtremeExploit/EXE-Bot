const main = require('../index').Main;
const data = main.getData();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class avatar {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {

        var user = (msg.mentions.members.first()) ? (msg.mentions.members.first().user) : (msg.author);

        msg.channel.send(new discord.RichEmbed()
            .setImage(user.displayAvatarURL)
            .setColor([255, 0, 0])
            .setURL(user.displayAvatarURL)
            .setTitle('URL')
            .setURL(user.displayAvatarURL)
            .setDescription(user.username + '\'s Avatar'));

    }
}
module.exports = avatar;
