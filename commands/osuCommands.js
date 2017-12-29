const _data                    = require('../scripts/data.js');
const data                     = new _data();
var prefix                     = data.prefix();
var osuApiKey                  = data.osuApiKey();
const _wikis                   = require('../scripts/wikis');
const wikis                    = {
    home: new _wikis().home(),
    commands: new _wikis().commands(),
    replies: new _wikis().replies(),
    faq : new _wikis().faq(),
    isEnabled: new _wikis().isEnabled()
};

const discord                  = require('discord.js');
const { RichEmbed, Message, Client }   = discord;
const _osuapi                  = require('osu.js');
const osuApi                   = _osuapi.api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const {Beatmap, Best, GamesOptions, Match, MatchOptions, Recent, Replay, Scores, ScoresOptions, User, UserEvents} = _osuapi;



class osuCommands {
    /**
     * Loads the osu commands.
     * @param {Message} msg
     */
    constructor(msg){
        this.msg = msg;
        this.messageArray = msg.content.split(' ');
        this.command = this.messageArray[0];
        this.args = this.messageArray.slice(1).join(' ');
    }
    commands(){

        if(this.command == prefix + 'osuStdUser'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: this.args,
                    m: 0,
                    type: 'string',
                    event_days: 4
                }).then(userf => {
                    this.msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    console.log(err);
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuTaikoUser'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: this.args,
                    m: 1,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    this.msg.channel.send(osuUser(userf));
                    })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
    
        }else if(this.command == prefix + 'osuCtbUser'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: this.args,
                    m: 2,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    this.msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuManiaUser'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUser({
                    u: this.args,
                    m: 3,
                    type: 'string',
                    event_days: 4
                }).then(userf =>{
                    this.msg.channel.send(osuUser(userf));
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuStdBest'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: this.args,
                    m: 0,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    this.msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuTaikoBest'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: this.args,
                    m: 1,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    this.msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuCtbBest'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: this.args,
                    m: 2,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    this.msg.channel.send(osuBest(playF))
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuManiaBest'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify an username!'));
            }else{
                osuApi.getUserBest({
                    u: this.args,
                    m: 3,
                    limit: 1,
                    type: 'string'
                }).then(playF =>{
                    this.msg.channel.send(osuBest(playF));
                })
                .catch(err => {
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('User does not exists or doesnt have any play in your search!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                });
            }
        }else if(this.command == prefix + 'osuBeatmap'){
            if(this.args == '' || this.args == null){
                this.msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .addField('Help', 'Check the [wiki](' + wikis.commands+'#osu) for help!')
                .setDescription('Pleace specify a beatmap ID'));
            }else{
                if(this.args.startsWith('https://osu.ppy.sh/s/')){
                    this.msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Error')
                    .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                    .setDescription('try a beatmap instead of a set of beatmaps!')
                    .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL))
                }else{
                    osuApi.getBeatmaps({
                        b: parseInt(this.args)
                    }).then(beatmap =>{
                        this.msg.channel.send(osuBeatmap(beatmap));
                    })
                    .catch(err => {
                        this.msg.channel.send(new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setTitle('Error')
                        .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                        .setDescription('Beatmap does not exists')
                        .setAuthor(this.msg.member.user.username, this.msg.member.user.displayAvatarURL));
                    });
                }
            }
        }
    }
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
                    msg.channel.send(osuBeatmapReply(bmF));
                })
            }
        })
    }
}


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
 * 
 * @param {Beatmap[]} bmF 
 */
function osuBeatmapReply(bmF){
    var bm = bmF[0];
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

module.exports = osuCommands;
