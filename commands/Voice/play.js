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
class play {
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
        
        if (!args[0] || args == '') {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#voice) for help!')
                .setDescription('Pleace specify a link!'));
            return;
        }

        if (!msg.member.voiceChannel) {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#voice) for help!')
                .setDescription('You must be in a voice channel first!'));
            return;
        }

        if (!servers[msg.guild.id]) {
            servers[msg.guild.id] = {
                queue: []
            }

        }

        var server = servers[msg.guild.id];

        server.queue.push(args);

        if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then((connection) => {
            functions.play(connection, msg);
        });
    }
}
module.exports = play;
