//#region Data
const main = require("../index").Main;
const functions = main.getFunctions();
const data = main.getData();
var prefix = data.prefix();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
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
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;
        if (!command_prefix.startsWith(prefix)) return;
        switch (command) {
            case 'help':
                //#region Embed Setup
                var embed = new discord.RichEmbed()
                    .setColor([0, 0, 255])
                    .setThumbnail(client.user.avatarURL)
                    .setTitle(`${client.user.username} Commands`);
                //#endregion

                //#region Voice
                if (data.commands().categories.Voice == true || data.commands().categories.Voice == 'true') {
                    embed.addField('Voice (EXPERIMENTAL)', '**play:** Plays music on your current voice channel \n' +
                        '**skip:** Skips the current song \n' +
                        '**stop:** Stops and leaves the current voice channel', true)
                }
                //#endregion

                //#region Support
                if (data.commands().categories.Support == true || data.commands().categories.Support == 'true') {
                    embed.addField('Support', '**invite:** Invite me to your server \n' +
                        '**help:** Shows this message\n' +
                        '**info:** Info about me', true)
                }
                //#endregion

                //#region Info
                if (data.commands().categories.Info == true || data.commands().categories.Info == 'true') {
                    embed.addField('Info', '**server:** Info about the server \n' +
                        '**role:** Info about a role \n' +
                        '**channel:** Info about a channel\n' +
                        '**user:** Info about you/someone \n' +
                        '**avatar:** Gets your/someone \'s Avatar', true)
                }
                //#endregion

                //#region Random
                if (data.commands().categories.Random == true || data.commands().categories.Random == 'true') {
                    embed.addField('Random', '**roll:** Rolls a dice\n' +
                        '**rate:** Rates something \n**8ball:**  Asks the 8ball a question \n' +
                        '**cat:** Gets a random cat image\n' +
                        '**dog:** Gets a random dog image\n' +
                        '**coinflip:** Flips a coin', true)
                }
                //#endregion

                //#region Moderation
                if (data.commands().categories.Moderation == true || data.commands().categories.Moderation == 'true') {
                    embed.addField('Moderation', '**kick:** Kicks someone \n' +
                        '**ban:** Bans someone \n' +
                        '**prune:** Deletes a count of messages in a channel', true)
                }
                //#endregion

                //#region Fun
                if (data.commands().categories.Fun == true || data.commands().categories.Fun == 'true') {
                    embed.addField('Fun', '**say:** Says whatever you want \n' +
                        '**lenny:** Displays the lenny face\n' +
                        '**cookie**: Gives a cookie to someone\n' +
                        '**sandwich:** Gives a sandwich to someone\n' +
                        '**pat**: Gives a headpat to someone\n' +
                        '**reverse:** Reverses text', true)
                }
                //#endregion

                //#region Osu
                if (data.commands().categories.Osu == true || data.commands().categories.Osu == 'true') {
                    embed.addField('Osu', '**osuStdUser**: Gets info about an user in the Standard mode \n' +
                        '**osuTaikoUser**: Gets info about an user in the Taiko mode \n' +
                        '**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n' +
                        '**osuManiaUser**: Gets info about an user in the Mania mode \n' +
                        '**osuStdBest:** Gets the best play of an user in the Standard mode \n' +
                        '**osuTaikoBest:** Gets the best play of an user in the Taiko mode \n' +
                        '**osuCtbBest:** Gets the best play of an user in the CatchTheBeat mode \n' +
                        '**osuManiaBest:** Gets the best play of an user in the mania mode \n' +
                        '**osuBeatmap**: Gets info about an osu!beatmap', true)
                }
                //#endregion

                //#region Voting
                if (data.commands().categories.Voting == true || data.commands().categories.Voting == 'true') {
                    embed.addField('Voting', '**Note** - To get this commands to work, vote the bot [here](https://discordbots.org/bot/353661793199194112/vote)\n' +
                        '**rps:** Play Rock, Paper and Scissors', true);
                }
                //#endregion

                //#region Misc
                if (data.commands().categories.Misc == true || data.commands().categories.Misc == 'true') {
                    embed.addField('Misc', '**ping:** Pings the bot and the discord API\n' +
                        '**pong:** Pongs the bot and the discord API\n' +
                        '**uptime:** Displays the uptime since the bot had the READY event\n' +
                        '**wiki:** Sends all the wikis available for the bot', true)
                }
                //#endregion

                //#region Wiki
                if (data.commands().categories.Wiki == true || data.commands().categories.Wiki == 'true') {
                    embed.addField('Wiki', '[Wiki](' + wikis.home + ')\n' +
                        '[Wiki: Commands](' + wikis.commands + ')\n' +
                        '[Wiki: Replies](' + wikis.replies + ')', true);
                }
                //#endregion

                //#region No Commands
                var commands = data.commands().categories;
                if (!commands.Fun == true &&
                    !commands.Info == true &&
                    !commands.Misc == true &&
                    !commands.Moderation == true &&
                    !commands.Osu == true &&
                    !commands.Random == true &&
                    !commands.Support == true &&
                    !commands.Voice == true &&
                    !commands.Wiki == true &&
                    !commands.Voting == true) {
                    embed.setDescription('I don\'t have any commands...')
                        .setFooter('Commands? what is that?')
                }
                msg.channel.send(embed);
                break;
        }
    }
}
//#endregion

module.exports = help;
