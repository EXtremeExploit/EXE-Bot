const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class info {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        msg.channel.send(new discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor([255, 0, 0])
            .setThumbnail(client.user.avatarURL)
            .addField('Wikies', '[**Home**](' + wikis.home + ')\n' +
            '[**Commands**](' + wikis.commands + ')\n' +
            '[**Replies**](' + wikis.replies + ')\n' +
            '[**FAQ**](' + wikis.faq + ')'));
    }
}
module.exports = info;
