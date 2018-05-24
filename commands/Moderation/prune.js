const main = require('../index').Main;
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
class prune {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var args = messageArray.slice(1).join(' ');

        if (msg.member.hasPermission(['MANAGE_MESSAGES']) || msg.member.hasPermission(['ADMINISTRATOR'])) {
            if (!args == null || !args == '') {
                if (args == '1' || parseInt(args) > 99) {
                    msg.channel.send(new discord.RichEmbed()
                        .addField('Help', 'Check the [wiki](' + wikis.commands + '#moderation) for help!')
                        .setDescription('Pleace specify a number between 2 and 99!')
                        .setColor([255, 0, 0]));
                } else {
                    msg.channel.bulkDelete(parseInt(args)).then(() => {
                        msg.channel.send(new discord.RichEmbed()
                            .setColor([255, 0, 0])
                            .setDescription('Deleted ' + parseInt(args) + ' Messages.')).then(deletemsg => {
                                deletemsg.delete(5000);
                            });;
                    });
                }

            } else {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#moderation) for help!')
                    .setDescription('Please specify a number!'));
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
module.exports = prune;
