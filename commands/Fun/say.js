const main = require('../commands').Main;
const data = main.getData();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class say {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var args = messageArray.slice(1).join(' ');

        if (!args == '' || args == null) {
            msg.channel.send(new discord.RichEmbed()
                .setDescription(args)
                .setColor([255, 0, 0])
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
                .setDescription('Pleace specify something to say!'));
        }
    }
}
module.exports = say;
