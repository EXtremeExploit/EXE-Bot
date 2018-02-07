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
var servers = data.servers();
const discord = require('discord.js');
const { Message, Client } = discord;
class stop {
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

        var server = servers[msg.guild.id];
        if (msg.guild.voiceConnection) {
            msg.guild.voiceConnection.disconnect()
            server.queue.length = 0;
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setDescription('Cleaned queue and disconnected from voice channel!'));

        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setDescription('I can\'t stop when i already stopped!'));
        }
    }
}
module.exports = stop;
