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
class cookie {
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
        
        var images = [
            'https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif',
            'http://i.giphy.com/E77F8BfvntOq4.gif',
            'https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986',
            'http://i.imgur.com/bYVl2.gif'
        ];
        var cookieImg = images[Math.floor(Math.random() * images.length)];
        if (msg.mentions.members.first()) {
            msg.channel.send(new discord.RichEmbed()
                .setTitle(msg.member.user.username + ' Has given a cookie to ' + msg.mentions.members.first().user.username)
                .setColor([255, 0, 0])
                .setImage(cookieImg));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
                .setDescription('Pleace specify an user!'));
        }
    }
}
module.exports = cookie;
