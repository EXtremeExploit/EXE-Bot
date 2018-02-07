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
//#region Osu Module
const _osuapi = require('osu.js');
const osuApi = _osuapi.api(osuApiKey); //Get one at https://osu.ppy.sh/p/api
//#endregion
class osuBeatmap {
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

        if (args == '' || args == null) {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
                .setDescription('Pleace specify a beatmap ID'));
        } else {
            if (args.startsWith('https://osu.ppy.sh/s/')) {
                msg.channel.send(new discord.RichEmbed()
                    .setColor([255, 0, 0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
                    .setDescription('try a beatmap instead of a set of beatmaps!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL))
            } else {
                osuApi.getBeatmaps({
                    b: parseInt(args)
                }).then(beatmap => {
                    msg.channel.send(functions.osuBeatmap(beatmap));
                })
                    .catch(err => {
                        console.error(err);
                        msg.channel.send(new discord.RichEmbed()
                            .setColor([255, 0, 0])
                            .setTitle('Error')
                            .addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
                            .setDescription('Beatmap does not exists')
                            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                    });
            }
        }
    }
}
module.exports = osuBeatmap;
