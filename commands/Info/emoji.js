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
class emoji {
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

        var name = args.replace(':', '')
        var emojiname = name.substring(1, name.indexOf(':'));
        try {
            if (args == '') {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
                    .setDescription('Pleace specify an emoji to get!'));
            } else {
                var emote = msg.guild.emojis.find('name', emojiname);
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setThumbnail(emote.url)
                    .setImage(emote.url)
                    .addField('Emoji Info',
                        '**ID:** ' + emote.id + '\n' +
                        '**Identifier:** ' + emote.identifier + '\n' +
                        '**Animated:** ' + emote.animated + '\n' +
                        '**Name:** ' + emote.name + '\n' +
                        '**URL:** ' + emote.url));
            }
        } catch (err) {
            if (err == 'TypeError: Cannot read property \'url\' of null') {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
                    .setDescription('Please insert a valid emoji, it needs to be a server emoji')
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL))
            } else {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
                    .setDescription('An unknown error ocurred, this will be reported to the owner to fix it, or you can directly report it at the support server')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                console.log(err);
            }
        }

    }
}
module.exports = emoji;
