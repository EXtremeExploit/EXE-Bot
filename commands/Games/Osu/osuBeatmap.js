const main = require('../../index').Main;
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
                    var bm = beatmap[0];
                    if (bm.approved == -2) bm.approved = 'Graveyard';
                    else if (bm.approved == -1) bm.approved = 'WIP';
                    else if (bm.approved == 0) bm.approved = 'Pending';
                    else if (bm.approved == 1) bm.approved = 'Ranked';
                    else if (bm.approved == 2) bm.approved = 'Approved';
                    else if (bm.approved == 3) bm.approved = 'Qualified';
                    else if (bm.approved == 4) bm.approved = 'Loved';
                    if (bm.approved_date == null) bm.approved_date = '*null*';
                    if (bm.source == '' || bm.source == null) bm.source = '*null*';
                    if (bm.tags == '' || bm.tags == null) bm.tags = '*null*';
                    if (bm.artist == '' || bm.artist == null) bm.artist = '*null*';

                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 58, 255])
                        .setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
                        .setTitle('osu!Beatmap')
                        .addField('Basic', '**Artist:** ' + bm.artist + '\n' +
                            '**Title:** ' + bm.title + '\n' +
                            '**Creator:** [' + bm.creator + '](https://osu.ppy.sh/u/' + bm.creator + ')\n' +
                            '**Difficulty Name:** ' + bm.version + '\n' +
                            '**Source:** ' + bm.source + '\n' +
                            '**BPM:** ' + bm.bpm + '\n' +
                            '**Max Combo:** ' + bm.max_combo + 'x\n' +
                            '**Status:** ' + bm.approved, true)
                        .addField('Difficulty', '**Stars:** ' + functions.fixDecimals(bm.difficultyrating) + '*\n' +
                            '**HP:** ' + bm.diff_drain + '\n' +
                            '**OD:** ' + bm.diff_overall + '\n' +
                            '**AR:** ' + bm.diff_approach + '\n' +
                            '**CS:** ' + bm.diff_size, true)
                        .addField('IDs', '**BeatmapSet:** ' + bm.beatmapset_id + '\n' +
                            '**Beatmap:** ' + bm.beatmap_id, true)
                        .addField('Links', '[**Beatmap Set**](https://osu.ppy.sh/s/' + bm.beatmapset_id + ')\n' +
                            '[**Beatmap**](https://osu.ppy.sh/b/' + bm.beatmap_id + ')\n' +
                            '[**Download Beatmap Set**](https://osu.ppy.sh/d/' + bm.beatmapset_id + ')', true));
                }).catch(err => {
                    if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
                        msg.channel.send(new discord.RichEmbed()
                            .setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
                            .setColor([255, 0, 0])
                            .setFooter('this is bad af')
                            .addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info'));
                    } else {
                        if (err == 'TypeError: Cannot read property \'approved\' of undefined') {
                            msg.channel.send(new discord.RichEmbed()
                                .setColor([255, 0, 0])
                                .setTitle('Error')
                                .addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
                                .setDescription('Beatmap does not exists')
                                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                        } else {
                            msg.channel.send(new discord.RichEmbed()
                                .setColor([255, 0, 0])
                                .setTitle('Error')
                                .addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
                                .setDescription('An unknown error ocurred, this will be reported to the owner to fix it, or you can directly report it at the support server')
                                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                            console.log(err);
                        }
                    }
                });
            }
        }
    }
}
module.exports = osuBeatmap;
