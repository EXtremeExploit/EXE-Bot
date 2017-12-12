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
const osu                      = require('node-osu');
const osuApi                   = new osu.Api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api

class osuCommands {
    constructor(msg){
        var messageArray = msg.content.split(' ');
        var command = messageArray[0];
        var args = messageArray.slice(1).join(' ');



        if(command == prefix + 'osuStdUser'){
            osuApi.apiCall('/get_user',{
                u: args,
                m: 0,
                type: 'string',
                event_days: 4
            }).then(userf => {
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
    
        }else if(command == prefix + 'osuTaikoUser'){
            osuApi.apiCall('/get_user',{
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
    
        }else if(command == prefix + 'osuCtbUser'){
            osuApi.apiCall('/get_user',{
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
    
        }else if(command == prefix + 'osuManiaUser'){
            osuApi.apiCall('/get_user',{
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
    
        }else if(command == prefix + 'osuStdBest'){
            osuApi.apiCall('/get_user_best',{
                u: args,
                m: 0,
                limit: 1,
                type: 'string'
            }).then(playF =>{
                msg.channel.send(osuBest(playF))
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
    
        }else if(command == prefix + 'osuTaikoBest'){
            osuApi.apiCall('/get_user_best',{
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
    
        }else if(command == prefix + 'osuCtbBest'){
            osuApi.apiCall('/get_user_best',{
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
    
        }else if(command == prefix + 'osuManiaBest'){
            osuApi.apiCall('/get_user_best',{
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
    
        }else if(command == prefix + 'osuBeatmap'){
            osuApi.apiCall('/get_beatmaps',{
                b: parseInt(args)
            }).then(beatmap =>{
                msg.channel.send(osuBeatmap(beatmap));
            })
            .catch(err => {
                console.log(err);
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

function osuUser(userf){
    var user = userf[0];
    return new discord.RichEmbed()
    .setColor([255, 58, 255])
    .setAuthor(user.username,'https://a.ppy.sh/' + user.user_id)
    .setThumbnail('https://a.ppy.sh/' + user.user_id)
    .addField('ID', user.user_id,true)
    .addField('Count Ranks','SS: ' + user.count_rank_ss + '\n' + 'S: ' + user.count_rank_s + '\n' + 'A: ' + user.count_rank_a, true)
    .addField('Country', user.country,true)
    .addField('Count Notes', '300: ' + user.count300 + '\n' + '100: ' + user.count100 + '\n' + '50: ' + user.count50,true)
    .addField('PP (Perfomance Points)', user.pp_raw,true)
    .addField('Scores','Total: ' + user.total_score + '\n' + 'Ranked: ' + user.ranked_score, true)
    .addField('Ranks','**Global: **' + user.pp_rank + '\n**Country:** ' + user.pp_country_rank, true)
    .addField('Play Count', user.playcount,true)
    .addField('Level', user.level, true)
    .addField('Accuracy',(fixDecimals(user.accuracy) + '%'), true)
    .addField('Links', '[**User**](https://osu.ppy.sh/u/' + play.user_id + ')\n'+
                       '[**Avatar**](https://a.ppy.sh/' + user.user_id + ')', true);
}

function osuBest(playF){
    var play = playF[0];
    if(play.rank == 'S') play.rank = 'S (Gold)';
    if(play.rank == 'SH') play.rank = 'S (Silver)';
    if(play.rank == 'X') play.rank = 'SS (Gold)';
    if(play.rank == 'XH') play.rank = 'SS (Silver)';
    return new discord.RichEmbed()
    .setColor([255, 58, 255])
    .addField('Map', '**Difficulty:** '+ getDiffName(play.beatmap_id))
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
    .addField('Links', '[**Beatmap Set**](https://osu.ppy.sh/s/'+getBeatmapSetID(play.beatmap_id)+')\n' +
                       '[**Beatmap**](https://osu.ppy.sh/b/'+play.beatmap_id+')\n'+
                       '[**Download Beatmap Set**](https://osu.ppy.sh/d/'+getBeatmapSetID(play.beatmap_id)+')\n'+
                       '[**User**](https://osu.ppy.sh/u/'+play.user_id+')', true)
}

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
    .setURL('https://osu.ppy.sh/b/'+bm.beatmap_id)
    .addField('Title', bm.title,true)
    .addField('BPM', bm.bpm,true)
    .addField('Artist', bm.artist, true)
    .addField('Difficulty', 'Stars: ' + fixDecimals(bm.difficultyrating) + '*\n' +
                            'HP: ' + bm.diff_drain + '\n' +
                            'OD: ' + bm.diff_overall + '\n' +
                            'AR: ' + bm.diff_approach + '\n' +
                            'CS: ' + bm.diff_size, true)
    .addField('Creator', bm.creator, true)
    .addField('Source', bm.source, true)
    .addField('Status', bm.approved)
    .addField('Difficulty Name', bm.version, true)
    .addField('IDs', '**BeatmapSet:** '+bm.beatmap_id+'\n**Beatmap:** '+bm.beatmap_id, true)
    .addField('Max Combo', bm.max_combo, true)
    .addField('Links', '[**Beatmap Set**](https://osu.ppy.sh/s/'+bm.beatmapset_id+')\n'+
                       '[**Beatmap**](https://osu.ppy.sh/b/'+bm.beatmap_id+')\n'+
                       '[**Download Beatmap Set**](https://osu.ppy.sh/d/'+bm.beatmapset_id+')', true);
}

function fixDecimals(number) {
    return parseFloat(number).toFixed(2);
}

function getBeatmapSetID(beatmap_id){
    osuApi.apiCall('/get_beatmaps',{
        b: parseInt(beatmap_id)
    }).then(bmF => {
        return bmF[0].beatmapset_id;
    });
}

function getDiffName(beatmap_id){
    osuApi.apiCall('/get_beatmaps', {
        b: parseInt(beatmap_id)
    }).then(bmF => {
        var bm = bmF[0];
        return bm.version;
    })
}

module.exports = osuCommands;
