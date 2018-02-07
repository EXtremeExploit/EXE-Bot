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
class ban {
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

        if (msg.member.hasPermission(['BAN_MEMBERS']) || msg.member.hasPermission(['ADMINISTRATOR'])) {
            if (msg.mentions.members.first()) {
                if (msg.member.user.id == msg.mentions.members.first().id) {
                    msg.channel.send(new discord.RichEmbed()
                        .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
                        .setTitle('ERROR')
                        .setDescription('You dont have permissions to run that command.')
                        .setColor([255, 0, 0]));
                } else {
                    if (msg.mentions.members.first().id == client.user.id) {
                        msg.channel.send(new discord.RichEmbed()
                            .setColor([255, 0, 0])
                            .setDescription('WHY ME!!!???')
                            .setTitle(';-;'));
                    } else {
                        if (msg.mentions.members.first().bannable) {
                            msg.mentions.members.first().ban().then((member) => {
                                member.send(new discord.RichEmbed()
                                    .setDescription('You got banned from ' + msg.guild.name)
                                    .setColor([255, 0, 0])
                                    .setTitle('Banned')
                                    .addField('Banned by', msg.member.user.tag));

                                msg.channel.send(new discord.RichEmbed()
                                    .setColor([255, 0, 0])
                                    .setTitle('Banned')
                                    .setDescription('Succesfully banned: ' + member.user.tag));
                            });
                        } else {
                            msg.channel.send(new discord.RichEmbed()
                                .setColor([255, 0, 0])
                                .setTitle('Ban Error')
                                .setDescription('I don\'t have permissions to do that'));
                        }
                    }
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
module.exports = ban;
