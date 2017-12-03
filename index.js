// STARTING
console.log('Starting...');
/************************************************
*                                               *
*                     DATA                      *
*                                               *
************************************************/

const _data       = require('./scripts/data.js');
const customCode  = require('./scripts/customCode');
const data        = new _data();
var token         = data.token();
var prefix        = data.prefix();
var osuApiKey     = data.osuApiKey();
var owner         = data.owner();
var allEvents     = data.allEvents();
var debug         = data.debug();

const _wikis      = require('./scripts/wikis.js')
const wikis       = {
    home: new _wikis().home(),
    commands: new _wikis().commands(),
    replies: new _wikis().replies(),
    faq : new _wikis().faq(),
    isEnabled: new _wikis().isEnabled()
};
/************************************************
*                                               *
*                    MODULES                    *
*                                               *
************************************************/

const discord     = require('discord.js');
const osu         = require('node-osu');
const yt          = require('ytdl-core');


const _randomCat  = require('./scripts/randomCat');
const _randomDog  = require('./scripts/randomDog');
const events      = require('./scripts/events.js');

const client      = new discord.Client({
    apiRequestMethod: 'sequential',
    shardId: 0,
    shardCount: 0,
    messageCacheMaxSize: 200,
    messageCacheLifetime: 0,
    messageSweepInterval: 0,
    fetchAllMembers: false,
    disableEveryone: false,
    sync: false,
    restWsBridgeTimeout: 5000,
    restTimeOffset: 500,
    disabledEvents: [],
    ws: {
        large_threshold: 100,
        compress: false
    },
    http: {
        version: 7,
        cdn: 'https://cdn.discordapp.com',
        host: 'https://discordapp.com'
    }
});

const osuApi      = new osu.Api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const randomCat   = new _randomCat();
const randomDog   = new _randomDog();
var servers       = {};

new events(client,debug,allEvents,prefix);
new customCode(client,discord);

client.setInterval((e) => {
    client.user.setPresence({
        status: "online",
        afk: false,
        game: {
            name: prefix+"help | "+prefix+"invite | "+client.guilds.size+" Servers",
            url: "https://www.twitch.tv/extremeexploit_",
        }
    })
},60000);

/************************************************
*                                               *
*                   FUNCTIONS                   *
*                                               *
************************************************/

function clean(text) {
    if (typeof(text) == 'string')
      return text
      .replace(token, '*TOKEN*')
      .replace(osuApiKey, '*OSUAPIKEY*');
    else
        return text;
}

function play(connection, msg) {
    var server = servers[msg.guild.id];

    server.dispatcher = connection.playStream(yt(server.queue[0], {filter: 'audioonly'}));

    server.queue.shift();

    server.dispatcher.on('end', () => {
        if(server.queue[0]) play(connection, msg);
        else connection.disconnect();
    });
}

function reverseString(string) {
    var splitString = string.split('');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join('');
    return joinArray;
}

function userInfo(user){
    if(user.presence.status == 'online') user.presence.status = 'Online';
    else if(user.presence.status == 'dnd') user.presence.status = 'Do Not Disturb';
    else if(user.presence.status == 'idle') user.presence.status = 'AFK';
    else if(user.presence.status == 'offline') user.presence.status = 'Offline/Disconnected';
    if(user.presence.game == null) user.presence.game = {
        name: '*null*',
        streaming: false,
        type: 0,
        url: null
    };
    return new discord.RichEmbed()        
    .setDescription(`${user.user.username} info`)
    .setColor([255,0,0])
    .addField('Full Username', user.user.tag,true)
    .addField('ID', user.id,true)
    .addField('Roles', '**Hoist:** '+ user.hoistRole+ '\n**Highest:** '+user.highestRole+ '\n**Color:** '+ user.colorRole,true)
    .addField('Presence', '**Playing:** '+ user.presence.game.name +'\n**Streaming:** '+ user.presence.game.streaming+ '\n**Status:** '+ user.presence.status,true)
    .addField('Created at', user.user.createdAt.toUTCString(),true)
    .addField('Joined at', user.joinedAt.toUTCString(),true)
    .addField('Bot', user.user.bot,true)
    .addField('Avatar','**Avatar Hash:** '+user.user.avatar +'\n**AvatarURL:** '+ user.user.displayAvatarURL,true)
    .setAuthor(user.user.username,user.user.displayAvatarURL)
    .setThumbnail(user.user.displayAvatarURL);
}

function osuUser(userf){
    var user = userf[0];
    var embed = new discord.RichEmbed()
    .setColor([255, 58, 255])
    .setAuthor(user.username,'https://a.ppy.sh/' + user.user_id)
    .setThumbnail('https://a.ppy.sh/' + user.user_id)
    .addField('ID', user.user_id,true)
    .addField('Count Ranks','SS: ' + user.count_rank_ss + '\n' + 'S: ' + user.count_rank_s + '\n' + 'A: ' + user.count_rank_a, true)
    .addField('Country', user.country,true)
    .addField('Count Notes', '300: ' + user.count300 + '\n' + '100: ' + user.count100 + '\n' + '50: ' + user.count50,true)
    .addField('PP (Perfomance Points)', user.pp_raw,true)
    .addField('Scores','Total: ' + user.total_score + '\n' + 'Ranked: ' + user.ranked_score, true)
    .addField('Global Ranks','**Global: **' + user.pp_rank + '\n**Country:** ' + user.pp_country_rank, true)
    .addField('Play Count', user.playcount,true)
    .addField('Level', user.level)
    .addField('Accuracy',(parseFloat(user.accuracy).toFixed(2) + '%'));
    return embed;
}

function osuBest(playF){
    var play = playF[0];
    var embed = new discord.RichEmbed()
    .setColor([255, 58, 255])
    .addField('Score', play.score)
    .addField('Combo', play.maxcombo)
    .addField('BeatmapID', play.beatmap_id)
    .addField('PP', play.pp)
    .addField('Rank', play.rank)
    .addField('Count Notes', '300: ' + play.count300 + '\n' + '100: ' + play.count100 + '\n' + '50: ' + play.count50,true)
    .addField('Date', play.date);
    return embed;
}

function osuRecent(playF){
    var play = playF[0];
    var embed = new discord.RichEmbed()
    .setColor([255,58,255])
    .addField('Score', play.score,true)
    .addField('Combo', play.maxcombo, true)
    .addField('BeatmapID', play.beatmap_id, true)
    .addField('Rank', play.rank, true)
    .addField('Count Notes', '300: ' + play.count300 + '\n' + '100: ' + play.count100 + '\n' + '50: ' + play.count50,true)
    .addField('Date', play.date,true);
    return embed;
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

    var embed = new discord.RichEmbed()
    .setColor([255, 58, 255])
    .setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
    .setTitle('osu!Beatmap')
    .addField('Title', bm.title)
    .addField('Artist', bm.artist)
    .addField('Creator', bm.creator)
    .addField('Status', bm.approved)
    .addField('IDs', '**BeatmapSet:** '+bm.beatmap_id+'\n**Beatmap:** '+bm.beatmap_id)
    .addField('BPM', bm.bpm)
    .addField('Difficulty', 'Stars: ' + bm.difficultyrating + '\n' + 'HP: ' + bm.diff_drain + '\n' + 'OD: ' + bm.diff_overall + '\n' + 'AR: ' + bm.diff_approach + '\n' + 'CS: ' + bm.diff_size)
    .addField('Source', bm.source)
    .addField('Difficulty Name', bm.version)
    .addField('Max Combo', bm.max_combo);
    return embed;
}

/************************************************
*                                               *
*                   COMMANDS                    *
*                                               *
************************************************/


client.on('message', (msg) => {
    var messageArray = msg.content.split(' ');
    var command = messageArray[0];
    var args = messageArray.slice(1).join(' ');
    if(msg.author.bot) return;
    if(msg.channel.type == 'dm' || msg.channel.type == 'group') return;
    if(!command.startsWith(prefix)) return;

    if(command == prefix + 'help') {
        var embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .setThumbnail(client.user.avatarURL)
        .setTitle(`${client.user.username} Commands`)
     // .addField('Voice','**join:** Joins a voice channel \n**play:** Plays the audio of a youtube video \n**skip:** Skips the current song \n**stop:** Stops playing the current song', true)
        .addField('Support','**invite:** Invite me to your server \n**info:** Info about me',true)
        .addField('Info','**server:** Info about the server \n**role:** Info about a role \n**channel:** Info about a channel\n**user:** Info about you/someone \n**avatar:** Gets your/someone \'s Avatar',true)
        .addField('Random','**roll:** Rolls a dice\n**rate:** Rates something \n**8ball:**  Asks the 8ball a question \n**cat:** Gets a random cat image\n**dog:** Gets a random dog image\n**coinflip:** Flips a coin',true)
        .addField('Moderation', '**kick:** Kicks someone \n**ban:** Bans someone \n**prune:** Deletes a count of messages in a channel',true)
        .addField('Fun','**say:** Says whatever you want \n**lenny:** Displays the lenny face\n**cookie**: Gives a cookie to someone\n**sandwich:** Gives a sandwich to someone\n**pat**: Gives a headpat to someone\n**reverse:** Reverses text',true)
        .addField('Osu', '**osuStdUser**: Gets info about an user in the Standard mode \n**osuTaikoUser**: Gets info about an user in the Taiko mode \n**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n**osuManiaUser**: Gets info about an user in the Mania mode \n**osuStdBest:** Gets the best play of an user in the Standard mode \n**osuTaikoBest:** Gets the best play of an user in the Taiko mode \n**osuCtbBest:** Gets the best play of an user in the CatchTheBeat mode \n**osuManiaBest:** Gets the best play of an user in the mania mode \n**osuBeatmap**: Gets info about an osu!beatmap', true)
        .addField('Misc','**ping:** Pings the bot and the discord API\n**pong:** Pongs the bot and the discord API\n**uptime:** Displays the uptime since the bot had the READY event\n**wiki:** Sends all the wikis available for the bot',true)
        .addField('Wiki','[Wiki]('+wikis.home+')\n[Wiki: Commands]('+wikis.commands+')\n[Wiki: Replies]('+wikis.replies+')', true);
        msg.channel.send(embed);
    }
        //Voice

        /*else if(command == prefix + 'join') {
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                  .then(connection => {
                      var embed = new discord.RichEmbed()
                      .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                      .setColor([255,0,0])
                      .setTitle('Join')
                      .setDescription('SUCCesfully joined to the channel!')
                    msg.channel.send(embed);
                  })
                  .catch(console.log);
              } else {
                  var embed = new discord.RichEmbed()
                  .setColor([255,0,0])
                  .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                  .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                  .setDescription('You need to join a voice channel first')
                msg.channel.send(embed);
              }
        }else if (command == prefix + 'play'){
            if(!msg.member.voiceChannel) {
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('You need to join a voice channel first')
                msg.channel.send(embed)
                return;
            }
    
            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }
    
            var server = servers[msg.guild.id];
            server.queue.push(args[0])
            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(connection => {
                play(connection,msg);
            });
        }else if(command == prefix + 'skip'){
            var server = servers[msg.guild.id];
            
            if(server.dispatcher){
                server.dispatcher.end();
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Skipped!');
                msg.channel.send(embed);
            }
        }else if(command == prefix + 'stop'){
            var server = servers[msg.guild.id];
    
            if(msg.guild.voiceConnection) {
                msg.guild.voiceConnection.disconnect();
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Disconnected!');
                msg.channel.send(embed);

            }
        }*/

        //Support

        else if(command == prefix +'invite'){
            client.generateInvite(['ADMINISTRATOR']).then(link =>{
                var embed = new discord.RichEmbed()
                .setTitle('Invite me to your server!')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setColor([255,0,0])
                .setDescription(link)
                .setURL(link)
                msg.channel.send(embed);
            });
        }else if(command == prefix + 'info') {
            var embed = new discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setColor([255,0,0])
            .setThumbnail(client.user.avatarURL)
            .addField('Wikies', '[**Home**]('+wikis.home+')\n[**Commands**]('+wikis.commands+')\n[**Replies**]('+wikis.replies+')\n[**FAQ**]('+wikis.faq+')')
            msg.channel.send(embed);
        }

        //Info

        else if(command == prefix + 'server'){
            if(msg.guild.available){
                if(msg.guild.verificationLevel == 0){
                    msg.guild.verificationLevel = 'None';
                }
                if(msg.guild.verificationLevel == 1){
                    msg.guild.verificationLevel = 'Low: Must have a verified e-mail on their Discord account';
                }
                if(msg.guild.verificationLevel == 2){
                    msg.guild.verificationLevel = 'Medium: Must have a verified e-mail and be registreder for longer than 5 minutes';
                }
                if(msg.guild.verificationLevel == 3){
                    msg.guild.verificationLevel = '(╯°□°）╯︵ ┻━┻: Must be in the server for longer than 10 minutes';
                }
                if(msg.guild.verificationLevel == 4){
                    msg.guild.verificationLevel = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻: Must have a phone on their discord account';
                }

                var embed = new discord.RichEmbed()
                .setAuthor(msg.guild.name,msg.guild.iconURL)
                .setColor([0,0,255])
                .setThumbnail(msg.guild.iconURL)
                .addField('ID', msg.guild.id, true)
                .addField('Region',msg.guild.region, true)
                .addField('AFK','**Channel** ' + msg.guild.afkChannel.name + '\n**ChannelID:**' + msg.guild.afkChannelID + '\n**Timeout:**' + msg.guild.afkTimeout + ' seconds', true)
                .addField('Counts','**Members:** '+msg.guild.memberCount+'\n**Roles:** '+ msg.guild.roles.size, true)
                .addField('Owner','**Owner:** '+msg.guild.owner+ '\n**OwnerID:** '+ msg.guild.ownerID, true)
                .addField('Verification Level',msg.guild.verificationLevel, true)
                .addField('Icon', '**Icon Hash:** '+msg.guild.icon+'\n**Icon URL:** '+ msg.guild.iconURL, true);
                msg.channel.send(embed);
            }else{
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Server not available')
            }
    }else if(command == prefix + 'role'){
        if(msg.mentions.roles.first()){
        var role = msg.mentions.roles.first();
        var embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .addField('Name',role.name)
        .addField('ID',role.id)
        .addField('Hex Color', role.hexColor)
        .addField('Position',role.position + 1)
        .addField('Mentionable',role.mentionable)
        .addField('Managed by a Bot',role.managed)
        .addField('Hoisted', role.hoist)
        .addField('Member Count',role.members.size);

        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#info) for help!')
            .setDescription('Pleace specify a role!');
            msg.channel.send(embed);
        }
    }
    else if(command == prefix + 'channel'){
        if(msg.mentions.channels.first()){
        var channel = msg.mentions.channels.first();
        var embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .setTitle(channel.name)
        .addField('Name',channel.name)
        .addField('ID',channel.id)
        .addField('Calculated Position',channel.calculatedPosition + 1)
        .addField('Type',channel.type)
        .addField('Created At',channel.createdAt.toUTCString());
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#info) for help!')
            .setDescription('Pleace specify a channel!');
            msg.channel.send(embed);
        }
    }else if(command == prefix + 'user'){
        if(msg.mentions.members.first()){
            var user = msg.mentions.members.first();
            var embed = userInfo(user);
        msg.channel.send(embed);
        }else{
            var user = msg.member;
            var embed = userInfo(user);
            msg.channel.send(embed)
        }
    }else if(command == prefix + 'avatar') {
        if(!msg.mentions.members.first()){
        var user = msg.member.user;
        var embed = new discord.RichEmbed()
        .setImage(user.displayAvatarURL)
        .setColor([255,0,0])
        .setURL(user.displayAvatarURL)
        .setDescription(user.username + '\'s Avatar');
        msg.channel.send(embed);
        }else{
            var user = msg.mentions.members.first().user;
            var embed = new discord.RichEmbed()
            .setImage(user.displayAvatarURL)
            .setColor([255,0,0])
            .setURL(user.displayAvatarURL)
            .setDescription(user.username + '\'s Avatar');
            msg.channel.send(embed);
        }
    }

    //Random

    else if(command == prefix + 'roll'){
        const roll = Math.floor(Math.random() * 6) + 1;
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('Roll')
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        .setDescription('You Rolled a: **'+roll+'**');
        msg.channel.send(embed);
    }else if(command == prefix + 'rate'){
        const rate = Math.floor(Math.random() * 11);
        if(!args == ''|| !args == null){
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('Rate')
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        .setDescription('I\'d rate '+args+' a: '+rate);
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#random) for help!')
            .setDescription('Pleace specify something to rate!');
            msg.channel.send(embed);
        }
    }else if(command == prefix + '8ball'){
        var response = [
            'Nope',
            'Yes', 
            'Of Course', 
            'Never',
            'Not looking so good...', 
            'Concentrate and ask again', 
            'Yes, definitely', 
            'Better not tell you now'
        ];
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('8ball')
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        .setDescription(response[Math.floor(Math.random() * response.length)]);
        msg.channel.send(embed);
    }else if(command == prefix + 'cat'){
        randomCat.getCat().then(cat => {
            var embed = new discord.RichEmbed()
            .setImage(cat.file)
            .setColor([255,0,0])
            .setTitle('Random Cat')
            .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });
    }else if(command == prefix + 'dog'){
        randomDog.getDog().then(dog => {
            var embed = new discord.RichEmbed()
            .setImage(dog.url)
            .setColor([255,0,0])
            .setTitle('Random Dog')
            .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });
    }else if(command == prefix + 'coinflip'){
        if(Math.random() < 0.5){
            msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
                .setTitle('Coin flip!')
                .setDescription('I flipped a coin and it landed on **heads**.'));
        }else{
            msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
                .setTitle('Coin flip!')
                .setDescription('I flipped a coin and it landed on **tails**.'));
        }
    }

    //Moderation

    else if(command == prefix + 'kick'){
        if(msg.member.hasPermission(['KICK_MEMBERS']) || msg.member.hasPermission(['ADMINISTRATOR'])) {
            if(msg.mentions.members.first()){
                if(msg.member.user.id == msg.mentions.members.first().id){
                    var embed = new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setDescription('Why do you want to kick yourself...?')
                    .setTitle('Are you serious?');
                    msg.channel.send(embed);
                }else{
                    if(msg.mentions.members.first().kickable){
                        msg.mentions.members.first().kick().then((member) => {
                        var embed = new discord.RichEmbed()
                        .setDescription('You got kicked from '+ msg.guild.name)
                        .setColor([255,0,0])
                        .setTitle('Kicked')
                        .addField('Kicked by', msg.member.user.tag);
                        member.send(embed);

                        var embed = new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setTitle('Kicked')
                        .setDescription('Succesfully kicked: '+member.user.tag);
                        msg.channel.send(embed);
                    });
                }else{
                    var embed = new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Kick Error')
                    .setDescription('I cannot kick owner/admins/role higher than me');
                    msg.channel.send(embed);
                }
            }
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#moderation) for help!')
            .setDescription('Pleace specify an user!');
            msg.channel.send(embed);
        
        }
    }else{
        var embed = new discord.RichEmbed()
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        .setTitle('ERROR')
        .setDescription('You dont have permissions to run that command.')
        .setColor([255,0,0]);
        msg.channel.send(embed);
        }
    }else if(command == prefix + 'ban'){
        if(msg.member.hasPermission(['BAN_MEMBERS']) || msg.member.hasPermission(['ADMINISTRATOR'])) {
            if(msg.mentions.members.first()){
                if(msg.member.user.id == msg.mentions.members.first().id){
                    var embed = new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setDescription('Why do you want to ban yourself...?')
                    .setTitle('Are you serious?');
                    msg.channel.send(embed);
                }else{
                    if(msg.mentions.members.first().bannable){
                        msg.mentions.members.first().ban().then((member) => {
                        var embed = new discord.RichEmbed()
                        .setDescription('You got banned from '+ msg.guild.name)
                        .setColor([255,0,0])
                        .setTitle('Banned')
                        .addField('Banned by', msg.member.user.tag);
                        member.send(embed);

                        var embed = new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setTitle('Banned')
                        .setDescription('Succesfully banned: '+member.user.tag);
                        msg.channel.send(embed);
                    });
                }else{
                    var embed = new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setTitle('Ban Error')
                    .setDescription('I cannot ban owner/admins/role higher than me');
                    msg.channel.send(embed);
                }
            }
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#moderation) for help!')
            .setDescription('Pleace specify an user!');
            msg.channel.send(embed);
        
        }
    }else{
        var embed = new discord.RichEmbed()
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        .setTitle('ERROR')
        .setDescription('You dont have permissions to run that command.')
        .setColor([255,0,0]);
        msg.channel.send(embed);
        }
    }else if(command == prefix + 'prune'){

        if(msg.member.hasPermission(['MANAGE_MESSAGES']) || msg.member.hasPermission(['ADMINISTRATOR'])){
        msg.channel.bulkDelete(parseInt(args)).then(() =>{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setDescription('Deleted '+ args+ ' Messages.');
            msg.channel.send(embed);
        });
        }else{
            var embed = new discord.RichEmbed()
            .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
            .setTitle('ERROR')
            .setDescription('You dont have permissions to run that command.')
            .setColor([255,0,0]);
            msg.channel.send(embed);
        }
    }

    //Fun

    else if(command == prefix + 'say'){
        var thing2say = args;
        if(!thing2say == '' || thing2say == null){
            var embed = new discord.RichEmbed()
            .setDescription(thing2say)
            .setColor([255,0,0])
            .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
            msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#fun) for help!')
            .setDescription('Pleace specify something to say!');
            msg.channel.send(embed);
        }
        
    }else if(command == prefix + 'lenny'){
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('Lenny')
        .setDescription('( ͡° ͜ʖ ͡°)');
        msg.channel.send(embed);
    }else if(command == prefix + 'cookie'){
        var images = [
            'https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif',
            'http://i.giphy.com/E77F8BfvntOq4.gif',
            'https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986',
            'http://i.imgur.com/bYVl2.gif'
        ];
        var cookieImg = images[Math.floor(Math.random() * images.length)];
        if(msg.mentions.members.first()){
        var embed = new discord.RichEmbed()
        .setTitle(msg.member.user.username + ' Has given a cookie to ' + msg.mentions.members.first().user.username)
        .setColor([255,0,0])
        .setImage(cookieImg);
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#fun) for help!')
            .setDescription('Pleace specify an user!');
            msg.channel.send(embed);
        }
    }else if(command == prefix + 'sandwich'){
        var images = [
            'https://pa1.narvii.com/6272/7beb194348fefb46bfdd519cb1ef0e530a621247_hq.gif',
            'https://i.imgur.com/325tm32.gif',
            'https://mayraissenpai.files.wordpress.com/2016/12/tumblr_m6krnt7ghk1qk46vzo1_500.gif?w=656',
            'https://78.media.tumblr.com/66405e70b83061ec312ba553eb577847/tumblr_n6k8kv9AK21r4kkpvo1_500.gif',
            'https://78.media.tumblr.com/c4ced24d4ffaba84b430a9faca23d206/tumblr_opnapuxv531vviqkjo1_500.gif',
            'https://i.pinimg.com/originals/c5/b6/94/c5b694dbce3e8662b01adb6771463aa1.gif'
        ];
        var sandwichImg = images[Math.floor(Math.random() * images.length)];
        if(msg.mentions.members.first()){
        var embed = new discord.RichEmbed()
        .setTitle(msg.member.user.username + ' Has given a sandwich to ' + msg.mentions.members.first().user.username)
        .setColor([255,0,0])
        .setImage(sandwichImg);
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#fun) for help!')
            .setDescription('Pleace specify an user!');
            msg.channel.send(embed);
        }
    }else if(command == prefix + 'pat'){
        var images = [
            'https://pa1.narvii.com/6490/e9649d41af555774b0bd62ed43c050dc036ed6c9_hq.gif',
            'http://i0.kym-cdn.com/photos/images/original/001/142/787/396.gif',
            'https://media.giphy.com/media/SvQ7tWn8zeY2k/source.gif',
            'https://78.media.tumblr.com/18e1fdcde34edf0cf03c588162fbd0ea/tumblr_npeccq4y3H1rzk6edo1_500.gif',
            'https://pa1.narvii.com/6353/60e5d2c9721de7f3f3b1946acfa3acc2f3d43b9e_hq.gif',
            'http://i.imgur.com/laEy6LU.gif',
            'https://funnypictures1.fjcdn.com/funny_gifs/Head_389b42_6102763.gif',
            'https://memestatic4.fjcdn.com/thumbnails/comments/She+deserves+all+the+head+pats+_952b94cc7a9bfd9107e28ece64b158de.gif'
        ];
        var patImg = images[Math.floor(Math.random() * images.length)];
        if(msg.mentions.members.first()){
        var embed = new discord.RichEmbed()
        .setTitle(msg.member.user.username + ' Has given a headpat to ' + msg.mentions.members.first().user.username)
        .setColor([255,0,0])
        .setAuthor('>///<')
        .setImage(patImg);
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#fun) for help!')
            .setDescription('Pleace specify an user!');
            msg.channel.send(embed);
        }

    }else if(command == prefix + 'reverse'){
        if(!args == ''|| args == null){
        var reversedText = reverseString(args);
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
        .setDescription(reversedText)
        .setTitle('Reverse');
        msg.channel.send(embed);
        }else{
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#fun) for help!')
            .setDescription('Pleace specify something to reverse!');
            msg.channel.send(embed);
        }
    }

    //Osu

    else if(command == prefix + 'osuStdUser'){
        osuApi.apiCall('/get_user',{
            u: args,
            m: 0,
            type: 'string',
            event_days: 4
        }).then(userf => {
            var embed = osuUser(userf);
            msg.channel.send(embed);
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuTaikoUser'){
        osuApi.apiCall('/get_user',{
            u: args,
            m: 1,
            type: 'string',
            event_days: 4
        }).then(userf =>{
            var embed = osuUser(userf);
            msg.channel.send(embed);
            })
            .catch(err => {
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setTitle('Error')
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
                .setDescription('User does not exists')
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
                msg.channel.send(embed);
            });

    }else if(command == prefix + 'osuCtbUser'){
        osuApi.apiCall('/get_user',{
            u: args,
            m: 2,
            type: 'string',
            event_days: 4
        }).then(userf =>{
            var embed = osuUser(userf);
            msg.channel.send(embed);
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuManiaUser'){
        osuApi.apiCall('/get_user',{
            u: args,
            m: 4,
            type: 'string',
            event_days: 4
        }).then(userf =>{
            var embed = osuUser(userf);
            msg.channel.send(embed);
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuStdBest'){
        osuApi.apiCall('/get_user_best',{
            u: args,
            m: 0,
            limit: 1,
            type: 'string'
        }).then(playF =>{
            var embed = osuBest(playF);
            msg.channel.send(embed)
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuTaikoBest'){
        osuApi.apiCall('/get_user_best',{
            u: args,
            m: 0,
            limit: 1,
            type: 'string'
        }).then(playF =>{
            var embed = osuBest(playF);
            msg.channel.send(embed)
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuCtbBest'){
        osuApi.apiCall('/get_user_best',{
            u: args,
            m: 0,
            limit: 1,
            type: 'string'
        }).then(playF =>{
            var embed = osuBest(playF);
            msg.channel.send(embed)
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuManiaBest'){
        osuApi.apiCall('/get_user_best',{
            u: args,
            m: 0,
            limit: 1,
            type: 'string'
        }).then(playF =>{
            var embed = osuBest(playF);
            msg.channel.send(embed);
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('User does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });

    }else if(command == prefix + 'osuBeatmap'){
        osuApi.apiCall('/get_beatmaps',{
            b: parseInt(args[0])
        }).then(beatmap =>{
            var embed = osuBeatmap(beatmap);
            msg.channel.send(embed);
        })
        .catch(err => {
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setTitle('Error')
            .addField('Help', 'Check the [wiki]('+wikis.commands+'#osu) for help!')
            .setDescription('Beatmap does not exists')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL);
            msg.channel.send(embed);
        });
    }

    //Misc
    
    else if(command == prefix + 'pong'){
        var embed1 = new discord.RichEmbed()
        .setTitle('Pinging...')
        .setColor([0,0,255]);
         msg.channel.send(embed1).then( pingMsg => {
        var embed2 = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('Ping!')  
        .addField('Bot', `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
        .addField('API', `**${client.ping}ms.**`, true);
        pingMsg.edit(embed2);
        });
    }else if(command == prefix + 'ping') {
        var embed1 = new discord.RichEmbed()
        .setTitle('Pinging...')
        .setColor([0,0,255]);
         msg.channel.send(embed1).then( pingMsg => {
        var embed2 = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle('Pong!')
        .addField('Bot', `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
        .addField('API', `**${client.ping}ms.**`, true);
        pingMsg.edit(embed2);
        });
    }else if(command == prefix + 'uptime'){
        var miliseconds = client.uptime % 999;
        var seconds = Math.floor(client.uptime / 1000) % 59;
        var minutes = Math.floor(Math.floor(client.uptime / 1000) / 60) % 59;
        var hours = Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) /60) % 23;
        var days = Math.floor(Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) /60) / 24);
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setAuthor(client.user.username, client.user.avatarURL)
        .addField('Days', days)
        .addField('Hours', hours)
        .addField('Minutes', minutes)
        .addField('Seconds', seconds)
        .addField('Miliseconds', miliseconds);
        msg.channel.send(embed);
    }else if(command == prefix + 'wiki'){
        if(wikis.isEnabled()){
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setAuthor(client.user.username, client.user.avatarURL)
            .addField('Wikis', '**Home:** '+ wikis.home +'\n**Commands:** '+wikis.commands+'\n**Replies:** '+wikis.replies+'\n**FAQ:** '+wikis.faq)
            .setFooter('Wikis hosted by Github');
            msg.channel.send(embed);
        }   
    }

    //Bot Owner

    else if(command == prefix + 'disconnect') {
        if(msg.member.user.id == owner.id){
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setAuthor(client.user.username,client.user.avatarURL)
            .setDescription('Disconnecting...')
            .setTitle('Disconnect')
            msg.channel.send(embed).then(() => {
                client.destroy();
            }).then(() => {
                process.exit();
            });
        }else{
            msg.channel.send(new discord.RichEmbed()
            .setColor([255,0,0])
            .setDescription('Bot owner only!')
            .setFooter('how did you found this command?')
            );
        }
    }else if(command == prefix + 'eval'){
        
        if(msg.member.user.id == owner.id){
            try {
                const code = args;
                var evaled = eval(code);
                evaled = clean(evaled);
                if (typeof evaled !== 'string')
                  evaled = require('util').inspect(evaled);
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setTitle('Eval Command')
                .addField('Input', `\`\`\`${code}\`\`\``)
                .addField('Output:', `\`\`\`xl\n${clean(evaled)}\`\`\``)
                msg.channel.send(embed);
              } catch (err) {
                  var embed = new discord.RichEmbed()
                  .setTitle('ERROR')
                  .setColor([255,0,0])
                  .setDescription('\`\`\`xl\n'+clean(err)+'\`\`\`');
                msg.channel.send(embed);
              }
        }else{
            msg.channel.send(new discord.RichEmbed()
            .setColor([255,0,0])
            .setDescription('Bot owner only!')
            .setFooter('how did you found this command?')
            );
        }
    }
})

/************************************************
*                                               *
*                   REPLIES                     *
*                                               *
************************************************/

.on('message', (msg) =>{
    if(msg.author.bot) return;
    if(msg.channel.type == 'dm' || msg.channel.type == 'group') return;

    var message = msg.content.toLowerCase();

    if(message == 'ayy')
        msg.channel.send('lmao');
    if(message == 'omaewa mou shindeiru' || message == 'omae wa mou shindeiru')
        msg.channel.send('NANI!?!');
    if(message == 'おまえ わ もう しんでいる')
        msg.channel.send('なに！？');
    if(message == 'o/')
        msg.channel.send('\\o');
    if(message == '\\o')
        msg.channel.send('o/');
    if(message == 'top')
        msg.channel.send('kek');
    if(message == 'ok'|| message == 'oke')
        msg.channel.send('oke');
    if(message == 'lmao')
        msg.channel.send('ayy');
});

client.login(token).catch(e => console.log(e));
