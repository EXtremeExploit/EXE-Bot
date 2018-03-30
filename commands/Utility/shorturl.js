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
const shorten = require('isgd');

const discord = require('discord.js');
const { Message, Client } = discord;
class shorturl {
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

        //https://is.gd/exe_bot

        if (args == '') {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
                .setDescription('Pleace specify something to short!'));
        } else {
            shorten.shorten(args, (res) => {
                if (res.startsWith('Error:')) {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
                        .setDescription('Pleace specify a valid URL to short!'));
                } else {
                    msg.channel.send(res);
                }
            });
        }
    }
}

module.exports = shorturl;
