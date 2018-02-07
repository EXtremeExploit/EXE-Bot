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
class coinflip {
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

        var randonmes = Math.random().toFixed(2);
        if (randonmes < 0.5) {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
                .setTitle('Coin flip!')
                .setDescription('I flipped a coin and it landed on **heads**.'));
        } else if (randonmes > 0.5) {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
                .setTitle('Coin flip!')
                .setDescription('I flipped a coin and it landed on **tails**.'));
        } else if (randonmes == 0.5) {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
                .setTitle('Coin flip!')
                .setDescription('I flipped a coin and it landed on.... THE EDGE!!!'));
        }
    }
}
module.exports = coinflip;
