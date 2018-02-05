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
class role {
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
        if (msg.author.bot) return;
        if (msg.mentions.roles.first()) {
            var role = msg.mentions.roles.first();

            msg.channel.send(new discord.RichEmbed()
                .setColor([0, 0, 255])
                .addField('Name', role.name)
                .addField('ID', role.id)
                .addField('Hex Color', role.hexColor)
                .addField('Position', role.position + 1)
                .addField('Mentionable', role.mentionable)
                .addField('Managed by a Bot', role.managed)
                .addField('Hoisted', role.hoist)
                .addField('Member Count', role.members.size));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
                .setDescription('Pleace specify a role!'));
        }
    }
}
module.exports = role;
