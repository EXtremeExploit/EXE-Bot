//#region Data
const main = new (require("../scripts/")).Main();
const data = main.getData();
var prefix                     = data.prefix();
var osuApiKey                  = data.osuApiKey();
const wikis                                   = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikis().isEnabled
};
//#endregion

//#region Require Modules
//#region Discord Module
const discord                  = require('discord.js');
const { RichEmbed, Message, Client }   = discord;
//#endregion
//#region Osu Module
const _osuapi                  = require('osu.js');
const osuApi                   = _osuapi.api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const {Beatmap, Best, GamesOptions, Match, MatchOptions, Recent, Replay, Scores, ScoresOptions, User, UserEvents} = _osuapi;
//#endregion
//#endregion

//#region Osu Commands & Replies
class osuCommands {
    constructor(){
        
    }
    //#region Commands
    /**
     * Loads the osu commands.
     * @param {Message} msg
     */
    commands(msg){
        var messageArray = msg.content.split(' ');
        var command = messageArray[0];
        var args = messageArray.slice(1).join(' ');

        if(command == prefix + 'osuStdUser'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: args,
                    m: 0,
                    type: 'string',
                    event_days: 4
                }).then(userf => {
                    msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    console.log(err);
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuTaikoUser'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: args,
                    m: 1,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    msg.channel.send(osuUser(userf));
                    })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
    
        }else if(command == prefix + 'osuCtbUser'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: args,
                    m: 2,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuManiaUser'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: args,
                    m: 3,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuStdBest'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: args,
                    m: 0,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuTaikoBest'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: args,
                    m: 1,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuCtbBest'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: args,
                    m: 2,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuManiaBest'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: args,
                    m: 3,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    msg.channel.send(osuBest(playF));
                })
                .catch(err => {
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                });
            }
        }else if(command == prefix + 'osuBeatmap'){
            if(args == '' || args == null){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify a beatmap ID'));
            }else{
                if(args.startsWith('https://osu.ppy.sh/s/')){
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('try a beatmap instead of a set of beatmaps!')
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL))
                }else{
                    osuApi.getBeatmaps({
                        b: parseInt(args)
                    }).then(beatmap =>{
                        msg.channel.send(osuBeatmap(beatmap));
                    })
                    .catch(err => {
                        msg.channel.send(new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setTitle('Error')
                        .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                        .setDescription('Beatmap does not exists')
                        .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
                    });
                }
            }
        }
    }
    //#endregion
    //#region Replies
    /**
     * 
     * @param {Client} client 
     */
    replies(client){
        client.on('message', msg => {
            if (msg.content.startsWith('https://osu.ppy.sh/b/')){
                var id = msg.content.split('/')[4];
                osuApi.getBeatmaps({
                    b: parseInt(id)
                }).then(bmF => {
                    msg.channel.send(osuBeatmap(bmF));
                })
            }
            if (msg.content.startsWith('https://osu.ppy.sh/u/')){
                var id = msg.content.split('/')[4];
                osuApi.getUser({
                    u: id,
                    type: 'id',

                }).then(userF => {
                    msg.channel.send(osuUser(userF));
                })
            }
        })
    }
    //#endregion
}
//#endregion

//#region Functions

/**
 * Returns the RichEmbed for user commands.
 * @param {User[]} userF 
 * @returns {RichEmbed} 
 */
function osuUser(userF){
    var user = userF[0];
    return new discord.RichEmbed()
    .setColor([255, 58, 255])
    .setAuthor(user.username,'https://a.ppy.sh/' + user.user_id)
    .setThumbnail('https://a.ppy.sh/' + user.user_id)
    .addField('General', '**ID:** '+ user.user_id + '\n' +
                         '**Country:** '+user.country + '\n' +
                         '**PP:** '+user.pp_raw + '\n' +
                         '**Level:** '+user.level + '\n' +
                         '**Accuracy:** '+ fixDecimals(user.accuracy)+ '%\n'+
                         '**Play Count:** '+user.playcount +'\n', true)
    .addField('Count Ranks','**SS:** ' + user.count_rank_ss + '\n' +
                            '**S:** ' + user.count_rank_s + '\n' +
                            '**A:** ' + user.count_rank_a, true)
    .addField('Ranks','**Global:** ' + user.pp_rank + '\n' +
                      '**Country:** ' + user.pp_country_rank, true)
    .addField('Count Notes', '**300:** ' + user.count300 + '\n' +
                             '**100:** ' + user.count100 + '\n' +
                             '**50:** ' + user.count50,true)
    .addField('Scores','Total: ' + user.total_score + '\n' + 'Ranked: ' + user.ranked_score, true)
    .addField('Links', '[**User**](https://osu.ppy.sh/u/' + user.user_id + ')\n'+
                       '[**Avatar**](https://a.ppy.sh/' + user.user_id + ')', true);
}

/**
 * Returns the RichEmbed for user best commands.
 * @param {Best[]} playF 
 */
function osuBest(playF){
    var play = playF[0];
    if(play.rank == 'S') play.rank = 'S (Gold)';
    if(play.rank == 'SH') play.rank = 'S (Silver)';
    if(play.rank == 'X') play.rank = 'SS (Gold)';
    if(play.rank == 'XH') play.rank = 'SS (Silver)';
    return new discord.RichEmbed()
    .setColor([255, 58, 255])
    .addField('BeatmapID', play.beatmap_id, true)
    .addField('Score', play.score, true)
    .addField('Count Notes', '**300:** ' + play.count300 + '\n' +
                             '**100:** ' + play.count100 + '\n' +
                             '**50:** ' + play.count50 + '\n' +
                             '**Misses:** '+ play.countmiss,true)
    .addField('Combo', play.maxcombo, true)
    .addField('Date', play.date, true)
    .addField('PP', play.pp, true)
    .addField('Rank', play.rank, true)
    .addField('Links', '[**Beatmap**](https://osu.ppy.sh/b/'+play.beatmap_id+')\n'+
                       '[**User**](https://osu.ppy.sh/u/'+play.user_id+')', true)
}

/**
 * Returns the RichEmbed for beatmap command.
 * @param {Beatmap[]} beatmap
 */
function osuBeatmap(beatmap){
    var bm = beatmap[0];
    if(bm.approved == -2) bm.approved = 'Graveyard';
    else if(bm.approved == -1) bm.approved = 'WIP';
    else if(bm.approved == 0) bm.approved = 'Pending';
    else if(bm.approved == 1) bm.approved = 'Ranked';
    else if(bm.approved == 2) bm.approved = 'Approved';
    else if(bm.approved == 3) bm.approved = 'Qualified';
    else if(bm.approved == 4) bm.approved = 'Loved';
    if(bm.approved_date == null) bm.approved_date = '*null*';
    if(bm.source == '' || bm.source == null) bm.source = '*null*';
    if(bm.tags == '' || bm.tags == null) bm.tags = '*null*';
    if(bm.artist == '' || bm.artist == null) bm.artist = '*null*';

    return new discord.RichEmbed()
    .setColor([255, 58, 255])
    .setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
    .setTitle('osu!Beatmap')
    .addField('Basic', '**Artist:** '+ bm.artist + '\n' +
                       '**Title:** '+ bm.title + '\n' +
                       '**Creator:** '+ bm.creator + '\n' +
                       '**Difficulty Name:** '+ bm.version + '\n' +
                       '**Source:** '+ bm.source + '\n' +
                       '**BPM:** '+ bm.bpm + '\n' +
                       '**Max Combo:** '+ bm.max_combo + 'x\n' +
                       '**Status:** '+ bm.approved, true)
    .addField('Difficulty', '**Stars:** ' + fixDecimals(bm.difficultyrating) + '*\n' +
                            '**HP:** ' + bm.diff_drain + '\n' +
                            '**OD:** ' + bm.diff_overall + '\n' +
                            '**AR:** ' + bm.diff_approach + '\n' +
                            '**CS:** ' + bm.diff_size, true)
    .addField('IDs', '**BeatmapSet:** '+bm.beatmap_id+'\n' +
                     '**Beatmap:** '+bm.beatmap_id, true)
    .addField('Links', '[**Beatmap Set**](https://osu.ppy.sh/s/'+bm.beatmapset_id+')\n'+
                       '[**Beatmap**](https://osu.ppy.sh/b/'+bm.beatmap_id+')\n'+
                       '[**Download Beatmap Set**](https://osu.ppy.sh/d/'+bm.beatmapset_id+')', true);
}

/**
 * Fixes decimals to 2 decimals
 * @param {number} number
 * @returns {number} 
 */
function fixDecimals(number) {
    return parseFloat(number).toFixed(2);
}

//#endregion

module.exports = osuCommands;
