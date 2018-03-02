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
class eightball {
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

        var response = [
            'Nope',
            'Yes',
            'Of Course',
            'Never',
            'Not looking so good...',
            'Concentrate and ask again',
            'Yes, definitely',
            'Better not tell you now'
        ];
        if (args == '') {
            msg.channel.send(new discord.RichEmbed()
                .setColor([0, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#random) for help!')
                .setDescription('Pleace specify an ask!'));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([0, 0, 0])
                .setTitle('8ball')
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
                .setDescription(response[Math.floor(Math.random() * response.length)]));
        }
    }
}
module.exports = eightball;
