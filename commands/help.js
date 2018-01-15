//#region Data
const main = new (require("../scripts/")).Main();
const data = main.getData();
var prefix = data.prefix();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikis().isEnabled
};
//#endregion

//#region Require Modules
//#region Discord Module
const discord = require('discord.js');
const { Message, Client } = discord;
//#endregion
//#endregion

//#region Help Command
class help {
    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     */
    constructor(client, msg) {
        var messageArray = msg.content.split(' ');
        var command = messageArray[0];
        if (command == prefix + 'help') {
            msg.channel.send(new discord.RichEmbed()
                .setColor([0, 0, 255])
                .setThumbnail(client.user.avatarURL)
                .setTitle(`${client.user.username} Commands`)
                .addField('Voice', '**play:** Plays music on your current voice channel \n' +
                '**skip:** Skips the current song \n' +
                '**stop:** Stops and leaves the current voice channel', true)
                .addField('Support', '**invite:** Invite me to your server \n' +
                '**info:** Info about me', true)
                .addField('Info', '**server:** Info about the server \n' +
                '**role:** Info about a role \n' +
                '**channel:** Info about a channel\n' +
                '**user:** Info about you/someone \n' +
                '**avatar:** Gets your/someone \'s Avatar', true)
                .addField('Random', '**roll:** Rolls a dice\n' +
                '**rate:** Rates something \n**8ball:**  Asks the 8ball a question \n' +
                '**cat:** Gets a random cat image\n' +
                '**dog:** Gets a random dog image\n' +
                '**coinflip:** Flips a coin', true)
                .addField('Moderation', '**kick:** Kicks someone \n' +
                '**ban:** Bans someone \n' +
                '**prune:** Deletes a count of messages in a channel')
                .addField('Fun', '**say:** Says whatever you want \n' +
                '**lenny:** Displays the lenny face\n' +
                '**cookie**: Gives a cookie to someone\n' +
                '**sandwich:** Gives a sandwich to someone\n' +
                '**pat**: Gives a headpat to someone\n' +
                '**reverse:** Reverses text', true)
                .addField('Osu', '**osuStdUser**: Gets info about an user in the Standard mode \n' +
                '**osuTaikoUser**: Gets info about an user in the Taiko mode \n' +
                '**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n' +
                '**osuManiaUser**: Gets info about an user in the Mania mode \n' +
                '**osuStdBest:** Gets the best play of an user in the Standard mode \n' +
                '**osuTaikoBest:** Gets the best play of an user in the Taiko mode \n' +
                '**osuCtbBest:** Gets the best play of an user in the CatchTheBeat mode \n' +
                '**osuManiaBest:** Gets the best play of an user in the mania mode \n' +
                '**osuBeatmap**: Gets info about an osu!beatmap', true)
                .addField('Misc', '**ping:** Pings the bot and the discord API\n' +
                '**pong:** Pongs the bot and the discord API\n' +
                '**uptime:** Displays the uptime since the bot had the READY event\n' +
                '**wiki:** Sends all the wikis available for the bot', true)
                .addField('Wiki', '[Wiki](' + wikis.home + ')\n' +
                '[Wiki: Commands](' + wikis.commands + ')\n' +
                '[Wiki: Replies](' + wikis.replies + ')', true));
        }
    }
}
//#endregion

module.exports = help;
