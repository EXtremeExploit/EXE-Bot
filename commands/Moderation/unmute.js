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
class unmute {
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

        if (msg.member.hasPermission('MANAGE_ROLES') || msg.member.hasPermission('ADMINISTRATOR')) {
            if (msg.mentions.members.first()) {
                if (msg.member.user.id == msg.mentions.members.first().id) {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('Why do you want to unmute yourself...?')
                        .setTitle('Are you serious?'));
                } else {
                    msg.channel.overwritePermissions(msg.mentions.members.first(), {
                        SEND_MESSAGES: true
                    }).then((channel) => {
                        msg.channel.send(new discord.RichEmbed()
                            .setColor([255, 0, 0])
                            .setTitle('Unmuted')
                            .setDescription('Succesfully unmuted: ' + msg.mentions.members.first().user.username));

                        msg.mentions.members.first().send(new discord.RichEmbed()
                            .setDescription('You got unmuted from ' + msg.guild.name)
                            .setColor([255, 0, 0])
                            .setTitle('unmuted')
                            .addField('unmuted by', msg.member.user.tag));
                    })
                }
            } else {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#moderation) for help!')
                    .setDescription('Pleace specify an user!'));

            }
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
                .setTitle('ERROR')
                .setDescription('You dont have permissions to run that command.')
                .setColor([255, 0, 0]));
        }
    }
}
module.exports = unmute;
