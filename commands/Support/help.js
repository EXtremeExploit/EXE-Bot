//#region Data
const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var prefix = data.prefix();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    modifiers: data.wikis().modifiers,
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

        var commands = main.helpGenerator();

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

                //#region Support
                if (data.commands().categories.Support == true || data.commands().categories.Support == 'true') {
                    embed.addField('Support', commands.support, true)
                }
                //#endregion
                //#region Fun
                if (data.commands().categories.Fun == true || data.commands().categories.Fun == 'true') {
                    embed.addField('Fun', commands.fun, true)
                }
                //#endregion
                //#region Info
                if (data.commands().categories.Info == true || data.commands().categories.Info == 'true') {
                    embed.addField('Info', commands.info, true)
                }
                //#endregion
                //#region Misc
                if (data.commands().categories.Misc == true || data.commands().categories.Misc == 'true') {
                    embed.addField('Misc', commands.misc, true)
                }
                //#endregion
                //#region Moderation
                if (data.commands().categories.Moderation == true || data.commands().categories.Moderation == 'true') {
                    embed.addField('Moderation', commands.moderation, true)
                }
                //#endregion
                //#region NSFW
                if (data.commands().categories.NSFW == true || data.commands().categories.NSFW == 'true') {
                    embed.addField('NSFW', commands.nsfw, true)
                }
                //#endregion
                //#region Osu
                if (data.commands().categories.Osu == true || data.commands().categories.Osu == 'true') {
                    embed.addField('Osu', commands.osu, true)
                }
                //#endregion
                //#region Random
                if (data.commands().categories.Random == true || data.commands().categories.Random == 'true') {
                    embed.addField('Random', commands.random, true)
                }
                //#endregion
                //#region Utility
                if (data.commands().categories.Utility == true || data.commands().categories.Utility == 'true') {
                    embed.addField('Utility', commands.utility, true)
                }
                //#endregion
                //#region Voting
                if ((data.commands().categories.Voting == true || data.commands().categories.Voting == 'true') && (data.discordBots().enabled == true || data.discordBots().enabled == 'true')) {
                    embed.addField('Voting', commands.voting, true);
                }
                //#endregion

                //#region Wiki
                if (data.commands().categories.Wiki == true || data.commands().categories.Wiki == 'true') {
                    embed.addField('Wiki', commands.wiki, true);
                }
                //#endregion

                //#region No Commands
                var commands = data.commands().categories;
                if (!commands.Fun == true &&
                    !commands.Info == true &&
                    !commands.Misc == true &&
                    !commands.Moderation == true &&
                    !commands.NSFW == true &&
                    !commands.Osu == true &&
                    !commands.Random == true &&
                    !commands.Support == true &&
                    !commands.Wiki == true &&
                    !commands.Utility == true &&
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
