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
class info {
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

        var embed = new discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor([255, 0, 0])
            .setThumbnail(client.user.avatarURL);

        embed.addField('Usages', '**RAM:** ' + (process.memoryUsage().heapUsed / 1014 / 1024).toFixed(3) + 'MB\n' +
            '**CPU-System:** ' + process.cpuUsage().system + '\n' +
            '**CPU-User:** ' + process.cpuUsage().user, true);

        embed.addField('Counts', '**Servers:** ' + client.guilds.size + '\n' +
            '**Users:** ' + client.users.size + '\n' +
            '**Channels:** ' + client.channels.size, true);

        if (data.discordBots().enabled == true || data.discordBots().enabled == 'true') {
            embed.addField('Links', '[**Discord Bots**](https://discordbots.org/bot/353661793199194112)\n' +
                '[**Page**](https://extremeexploit.github.io/EXE_Bot)\n' +
                '[**Discord Server**](https://discord.gg/sJPmDDn)\n' +
                '[**Github Repository**](https://github.com/EXtremeExploit/EXE-Bot)', true)
        } else {
            embed.addField('Links', '[**Page**](https://extremeexploit.github.io/EXE_Bot)\n' +
                '[**Discord Server**](https://discord.gg/sJPmDDn)\n' +
                '[**Github Repository**](https://github.com/EXtremeExploit/EXE-Bot)', true)
        }

        if (data.wikisEnabled() == true || data.wikisEnabled() == 'true') {
            embed.addField('Wikies', '[**Home**](' + wikis.home + ')\n' +
                '[**Commands**](' + wikis.commands + ')\n' +
                '[**Replies**](' + wikis.replies + ')\n' +
                '[**FAQ**](' + wikis.faq + ')', true);
        }

        if (data.discordBots().enabled == true || data.discordBots().enabled == 'true') {
            embed.setImage('https://discordbots.org/api/widget/353661793199194112.png?topcolor=c90000&middlecolor=b70000&usernamecolor=ffffff&datacolor=FFFFFF&labelcolor=870000&highlightcolor=c90000&certifiedcolor=fffffff');
        }

        msg.channel.send(embed).catch((e) => console.log(e));
    }
}
module.exports = info;
