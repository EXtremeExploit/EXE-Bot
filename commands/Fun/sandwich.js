const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
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
class sandwich {
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
            'https://pa1.narvii.com/6272/7beb194348fefb46bfdd519cb1ef0e530a621247_hq.gif',
            'https://i.imgur.com/325tm32.gif',
            'https://mayraissenpai.files.wordpress.com/2016/12/tumblr_m6krnt7ghk1qk46vzo1_500.gif?w=656',
            'https://78.media.tumblr.com/66405e70b83061ec312ba553eb577847/tumblr_n6k8kv9AK21r4kkpvo1_500.gif',
            'https://78.media.tumblr.com/c4ced24d4ffaba84b430a9faca23d206/tumblr_opnapuxv531vviqkjo1_500.gif',
            'https://i.pinimg.com/originals/c5/b6/94/c5b694dbce3e8662b01adb6771463aa1.gif'
        ];
        var sandwichImg = images[Math.floor(Math.random() * images.length)];
        if (msg.mentions.members.first()) {
            msg.channel.send(new discord.RichEmbed()
                .setTitle(msg.member.user.username + ' Has given a sandwich to ' + msg.mentions.members.first().user.username)
                .setColor([255, 0, 0])
                .setImage(sandwichImg));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
                .setDescription('Pleace specify an user!'));
        }
    }
}
module.exports = sandwich;
