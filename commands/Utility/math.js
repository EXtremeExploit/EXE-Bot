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
const mathjs = require('mathjs');

const discord = require('discord.js');
const { Message, Client } = discord;
class math {
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

        if (args[0]) {
            try {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([8, 145, 1])
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL)
                    .setTitle('Math')
                    .setDescription(args + ' = ' + mathjs.eval(args)));
            } catch (e) {
                msg.channel.send(new discord.RichEmbed()
                    .setDescription(e.message)
                    .setColor([255, 0, 0])
                    .setTitle('An Error Ocurred!'));
            }
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setDescription('Enter an expression to evaluate')
                .setAuthor(msg.author.username, msg.author.displayAvatarURL));
        }
    }
}
module.exports = math;
