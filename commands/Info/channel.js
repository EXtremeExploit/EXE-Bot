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
class channel {
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

        if (msg.mentions.channels.first()) {
            var channel = msg.mentions.channels.first();
            msg.channel.send(new discord.RichEmbed()
                .setColor([0, 0, 255])
                .setTitle(channel.name)
                .addField('Name', channel.name)
                .addField('ID', channel.id)
                .addField('Calculated Position', channel.calculatedPosition + 1)
                .addField('Type', channel.type)
                .addField('Created At', channel.createdAt.toUTCString()));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
                .setDescription('Pleace specify a channel!'));
        }
    }
}
module.exports = channel;
