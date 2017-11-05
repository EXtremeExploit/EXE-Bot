/************************************************
*                                               *
*                     DATA                      *
*                                               *
************************************************/

const _data       = require("./scripts/data.js");
const data        = new _data();
var token         = data.token();
var prefix        = data.prefix();
var osuApiKey     = data.osuApiKey();
var ownerID       = data.ownerID();
var allEvents     = data.allEvents();
var debug         = data.debug();

/************************************************
*                                               *
*                    MODULES                    *
*                                               *
************************************************/

const discord     = require('discord.js');
const ffmpeg      = require("ffmpeg-binaries");
const osu         = require("node-osu");
const opusscript  = require("opusscript");
const yt          = require('ytdl-core');


const _randomCat  = require("./scripts/randomCat");
const events      = require("./scripts/events.js");

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
        cdn: 'https://cdn.discordapp.com'
    }
});

const osuApi      = new osu.Api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const randomCat   = new _randomCat();


new events(client,debug,allEvents,prefix);


/************************************************
*                                               *
*                   FUNCTIONS                   *
*                                               *
************************************************/

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var servers       = {};
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(yt(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", () => {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

function reverseString(string) {
    var splitString = string.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

/************************************************
*                                               *
*                   COMMANDS                    *
*                                               *
************************************************/



client.on("message", async (msg) => {
    let messageArray = msg.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1).join(" ");
    var message = msg;
    if(msg.author.bot) return;
    if(msg.channel.type === "dm" || msg.channel.type == "group") return;
    if(!command.startsWith(prefix)) return;

    if(command === prefix + "help") {
        var embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .setThumbnail(client.user.avatarURL)
        .setTitle(`${client.user.username} Commands`)
        .addField("Voice","**join:** Joins a channel \n**play:** Plays the audio of a youtube video \n**skip:** Skips the current song \n**stop:** Stops playing the current song ")
        .addField("Support","**invite:** Invite me to your server \n**info:** Info about me",true)
        .addField("Info","**server:** Info about the server \n**role:** Info about a role \n**channel:** Info about a channel\n**user:** Info about you \n**avatar:** Gets your AvatarURL",true)
        .addField("Random","**roll:** Rolls a dice\n**rate:** Rates something \n**8ball:**  Asks the 8ball a question \n**cat:** Gets a random cat image",true)
        .addField("Moderation", "**kick:** Kicks someone \n**ban:** Bans someone \n**purge:** Deletes a count of messages in a channel")
        .addField("Fun","**say:** Says whatever you want \n**lenny:** Displays the lenny face\n**cookie**: Gives a cookie to someone",true)
        .addField("Osu", "**osuStdUser**: Gets info about an user in the Standard mode \n**osuTaikoUser**: Gets info about an user in the Taiko mode \n**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n**osuManiaUser**: Gets info about an user in the Mania mode \n**osuStdBest:** Gets the best play of an user in the Standard mode \n**osuTaikoBest:** Gets the best play of an user in the Taiko mode \n**osuCtbBest:** Gets the best play of an user in the CatchTheBeat mode \n**osuManiaBest:** Gets the best play of an user in the mania mode \n**osuBeatmap**: Gets info about an osu!beatmap", true)
        .addField("Misc","**ping:** Pings the bot and the discord API",true)
        .addField("Wiki","[Wiki](https://github.com/EXtremeExploit/EXE-Bot/wiki/)\n[Wiki: Commands](https://github.com/EXtremeExploit/EXE-Bot/wiki/Commands)");
        msg.channel.send(embed);
    }
        //Voice

        else if(command === prefix + "join") {
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                  .then(connection => {
                      var embed = new discord.RichEmbed()
                      .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                      .setColor([255,0,0])
                      .setTitle("Join")
                      .setDescription("SUCCesfully joined to the channel!")
                    msg.channel.send(embed);
                  })
                  .catch(console.log);
              } else {
                  let embed = new discord.RichEmbed()
                  .setColor([255,0,0])
                  .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                  .setDescription("You need to join a voice channel first")
                msg.channel.send(embed);
              }
        }else if (command === prefix + "play"){
            if(!args[0] || args[0] === "https://" || args[0] === "http://" ) {
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription("Please provide a link!")
                message.channel.send(embed);
                return;
            }
            if(!message.member.voiceChannel) {
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription("You need to join a voice channel first")
                message.channel.send(embed)
                return;
            }
    
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
    
            var server = servers[message.guild.id];
            server.queue.push(args[0])
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection =>{
                play(connection,message);
            });
        }else if(command=== prefix + "skip"){
            var server = servers[message.guild.id];
    
            if(server.dispatcher) server.dispatcher.end();
        }else if(command=== prefix + "stop"){
            var server = servers[message.guild.id];
    
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect()
            ;
        }

        //Support

        else if(command === prefix +"invite"){
            client.generateInvite(["ADMINISTRATOR"]).then(link =>{
                var embed = new discord.RichEmbed()
                .setTitle("Invite me to your server!")
                .setURL(link)
                msg.channel.send(embed)
                ;
            });
        }else if(command === prefix + "info") {
            let embed = new discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setColor([255,0,0])
            .setThumbnail(client.user.avatarURL)
            .addField("Libraries & languge", "**JavaScript: Node.JS**\n\n**Libraries**\ndiscord.js\nnode-osu\nytdl-core",true)
            .addField("Wikies", "[**General**](https://github.com/EXtremeExploit/EXE-Bot/wiki)\n[**Commands**](https://github.com/EXtremeExploit/EXE-Bot/wiki/Commands)")
            msg.channel.send(embed);
        }

        //Info

        else if(command === prefix + "server"){
            if(msg.guild.verificationLevel == 0){
                msg.guild.verificationLevel = "None";
            }if(msg.guild.verificationLevel == 1){
                msg.guild.verificationLevel = "Low: Must have a verified e-mail on their Discord account";
            }if(msg.guild.verificationLevel == 2){
                msg.guild.verificationLevel = "Medium: Must have a verified e-mail and be registreder for longer than 5 minutes";
            }if(msg.guild.verificationLevel == 3){
                msg.guild.verificationLevel = "(╯°□°）╯︵ ┻━┻: Must be in the server for longer than 10 minutes";
            }if(msg.guild.verificationLevel == 4){
                msg.guild.verificationLevel = "High: Must have a phone on their discord account";
            }

            let embed = new discord.RichEmbed()
            .setAuthor(msg.guild.name,msg.guild.iconURL)
            .setColor([0,0,255])
            .setThumbnail(msg.guild.iconURL)
            .addField("ID", msg.guild.id)
            .addField("Region",msg.guild.region)
            .addField("AFK",msg.guild.afkChannel + "\n" + msg.guild.afkTimeout + " seconds")
            .addField("Counts","**Members:** "+msg.guild.memberCount+"\n**Roles:** "+ msg.guild.roles.size)
            .addField("Owner","**Owner:** "+msg.guild.owner+ "\n**OwnerID:** "+ msg.guild.ownerID)
            .addField("Verification Level",msg.guild.verificationLevel)
            .addField("Available",msg.guild.available);
    
            msg.channel.send(embed);
    }else if(command === prefix + "role"){
        var role = msg.mentions.roles.first();
        let embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .addField("Name",role.name)
        .addField("ID",role.id)
        .addField("Hex Color", role.hexColor)
        .addField("Position",role.position + 1)
        .addField("Mentionable",role.mentionable)
        .addField("Managed by a Bot",role.managed)
        .addField("Hoisted", role.hoist)
        .addField("Member Count",role.members.size);

        msg.channel.send(embed);
    }
    else if(command=== prefix + "channel"){
        let channel = msg.mentions.channels.first();
        let embed = new discord.RichEmbed()
        .setColor([0,0,255])
        .setTitle(channel.name)
        .addField("Name",channel.name)
        .addField("ID",channel.id)
        .addField("Calculated Position",channel.calculatedPosition + 1)
        .addField("Type",channel.type)
        .addField("Created At",channel.createdAt.toUTCString());
        msg.channel.send(embed);
    }else if(command === prefix + "user"){
            var user = msg.mentions.members.first();
            if(user.presence.status == "online") user.presence.status = "Online";
            else if(user.presence.status == "dnd") user.presence.status = "Do Not Disturb";
            else if(user.presence.status == "idle") user.presence.status = "AFK";
            else if(user.presence.status == "offline") user.presence.status = "Offline/Disconnected";
            if(user.presence.game == null) user.presence.game.name = "*null*";
            let embed = new discord.RichEmbed()        
            .setDescription(`${user.user.username} info`)
            .setColor([255,0,0])
            .addField("Full Username", user.user.tag,true)
            .addField("ID", user.id,true)
            .addField("Roles", "**Hoist:** "+ user.hoistRole+ "\n**Highest:** "+user.highestRole+ "\n**Color:** "+ user.colorRole,true)
            .addField("Presence", "**Playing:** "+ user.presence.game.name +"\n**Streaming:** "+ user.presence.game.streaming+ "\n**Status:** "+ user.presence.status,true)
            .addField("Created at", user.user.createdAt.toUTCString(),true)
            .addField("Joined at", user.joinedAt.toUTCString(),true)
            .addField("Bot", user.user.bot,true)
            .addField("Avatar","**Avatar Hash:** "+user.user.avatar +"\n**AvatarURL:** "+ user.user.displayAvatarURL,true)
            .setAuthor(user.user.username,user.user.displayAvatarURL)
            .setThumbnail(user.user.displayAvatarURL);
            msg.channel.send(embed);    
    }else if(command == prefix + "avatar") {
        let embed = new discord.RichEmbed()
        .setImage(msg.author.displayAvatarURL)
        .setColor([255,0,0])
        .setURL(msg.author.displayAvatarURL)
        .setDescription(msg.author.username + "'s Avatar");
        msg.channel.send(embed);
    }

    //Random

    else if(command=== prefix + "roll"){
        const roll = Math.floor(Math.random() * 6) + 1;
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle("Roll")
        .setAuthor(msg.member.user.username,msg.author.displayAvatarURL)
        .setDescription("You Rolled a: **"+roll+"**");
        msg.channel.send(embed);
    }else if(command === prefix + "rate"){
        const rate = Math.floor(Math.random() * 11);
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle("Rate")
        .setAuthor(msg.member.user.username,msg.author.displayAvatarURL)
        .setDescription("I'd rate "+args+"a: "+rate);
        msg.channel.send(embed);
    }else if(command=== prefix + "8ball"){
        var response = [
            "Nope",
            "Yes", 
            "Of Course", 
            "Never",
            "Not looking so good...", 
            "Concentrate and ask again", 
            "Yes, definitely", 
            "Better not tell you now"
        ];
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle("8ball")
        .setAuthor(msg.member.user.username,msg.author.displayAvatarURL)
        .setDescription(response[Math.floor(Math.random() * response.length)]);
        msg.channel.send(embed);
    }else if(command === prefix + "cat"){
        randomCat.getCat().then(cat => {
            var embed = new discord.RichEmbed()
            .setImage(cat.file)
            .setColor([255,0,0])
            .setTitle("Random Cat")
            .setAuthor(msg.author.username,msg.author.displayAvatarURL);
            msg.channel.send(embed);
        });
    }

    //Moderation

    else if(command == prefix + "kick"){
        if(msg.member.hasPermissions(["KICK_MEMBERS","ADMINISTRATOR"])) {
            msg.mentions.members.first().kick();
        }else{
            var embed = new discord.RichEmbed()
            .setAuthor(msg.author.username,msg.author.displayAvatarURL)
            .setTitle("ERROR")
            .setDescription("You dont have permissions to run that command.")
            .setColor([255,0,0]);
            msg.channel.send(embed);
        }
    }else if(command == prefix + "ban"){
        if(msg.member.hasPermissions(["BAN_MEMBERS","ADMINISTRATOR"])){
            msg.mentions.members.first().ban();
        }else{
            var embed = new discord.RichEmbed()
            .setAuthor(msg.author.username,msg.author.displayAvatarURL)
            .setTitle("ERROR")
            .setDescription("You dont have permissions to run that command.")
            .setColor([255,0,0]);
            msg.channel.send(embed);
        }
        
    }else if(command == prefix + "prune"){
        if(msg.member.hasPermissions(["MANAGE_MESSAGES", "ADMINISTRATOR"])){
        msg.channel.bulkDelete(parseInt(args[0]));
        }else{
            var embed = new discord.RichEmbed()
            .setAuthor(msg.author.username,msg.author.displayAvatarURL)
            .setTitle("ERROR")
            .setDescription("You dont have permissions to run that command.")
            .setColor([255,0,0]);
            msg.channel.send(embed);
        }
    }

    //Fun

    else if(command=== prefix + "say"){
        let thing2say = args; 
        var embed = new discord.RichEmbed()
        .setDescription(thing2say)
        .setColor([255,0,0])
        .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
        msg.channel.send(embed);
    }else if(command=== prefix + "lenny"){
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle("Lenny")
        .setDescription("( ͡° ͜ʖ ͡°)");
        msg.channel.send(embed);
    }else if(command=== prefix + "cookie"){
        var embed = new discord.RichEmbed()
        .setTitle(msg.author.username + " Has given a cookie to " + msg.mentions.members.first().user.username)
        .setImage("https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif")
        msg.channel.send(embed);
    }else if(command == prefix + "reverse"){
        var reversedText = reverseString(args);
        var embed = new discord.RichEmbed()
        .setColor([255,0,0])
        .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
        .setDescription(reversedText)
        .setTitle("Reverse");
        msg.channel.send(embed);
    }

    //Misc

    
    else if(command === prefix + "ping") {
        var embed1 = new discord.RichEmbed()
        .setTitle("Pinging...")
        .setColor([0,0,255]);
        const pingMsg = await msg.channel.send(embed1);
        var embed2 = new discord.RichEmbed()
        .setColor([255,0,0])
        .setTitle("Pong!")
        .addField("Bot", `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
        .addField("API", `**${client.ping}ms.**`, true);
        pingMsg.edit(embed2);
    }

    //Osu

    else if(command=== prefix + "osuStdUser"){
        var argswocommas = args;
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 0,
            type: "string",
            event_days: 4
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id,true)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, true)
            .addField("Country", user.country,true)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,true)
            .addField("PP (Perfomance Points)", user.pp_raw,true)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, true)
            .addField("Global Ranks","**Global: **" + user.pp_rank + "\n**Country:** " + user.pp_country_rank, true)
            .addField("Play Count", user.playcount,true)
            .addField("Level", user.level)
            .addField("Accuracy",(Math.round(parseInt(user.accuracy)) + "%"));
            message.channel.send(embed);
        })

    }else if(command=== prefix + "osuTaikoUser"){
        var argswocommas = args;
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 1,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id,true)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, true)
            .addField("Country", user.country,true)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,true)
            .addField("PP (Perfomance Points)", user.pp_raw,true)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, true)
            .addField("Global Ranks","**Global: **" + user.pp_rank + "\n**Country:** " + user.pp_country_rank, true)
            .addField("Play Count", user.playcount,true)
            .addField("Level", user.level)
            .addField("Accuracy",(Math.round(parseInt(user.accuracy)) + "%"));
            message.channel.send(embed);
                })

    }else if(command=== prefix + "osuCtbUser"){
        var argswocommas = args;
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 2,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id,true)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, true)
            .addField("Country", user.country,true)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,true)
            .addField("PP (Perfomance Points)", user.pp_raw,true)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, true)
            .addField("Global Ranks","**Global: **" + user.pp_rank + "\n**Country:** " + user.pp_country_rank, true)
            .addField("Play Count", user.playcount,true)
            .addField("Level", user.level)
            .addField("Accuracy",(Math.round(parseInt(user.accuracy)) + "%"));
            message.channel.send(embed);
        })

    }else if(command=== prefix + "osuManiaUser"){
        var argswocommas = args;
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 3,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id,true)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, true)
            .addField("Country", user.country,true)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,true)
            .addField("PP (Perfomance Points)", user.pp_raw,true)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, true)
            .addField("Global Ranks","**Global: **" + user.pp_rank + "\n**Country:** " + user.pp_country_rank, true)
            .addField("Play Count", user.playcount,true)
            .addField("Level", user.level)
            .addField("Accuracy",(Math.round(parseInt(user.accuracy)) + "%"));
            message.channel.send(embed);
        })

    }else if(command == prefix + "osuStdBest"){
        var argswocommas = args;
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            //.setThumbnail("https://b.ppy.sh/thumb/" + play.beatmap_id + "l.jpg")
            .addField("Score", play.score)
            .addField("Combo", play.maxcombo)
            .addField("BeatmapID", play.beatmap_id)
            .addField("PP", play.pp)
            .addField("Rank", play.rank)
            .addField("Count Notes", "300: " + play.count300 + "\n" + "100: " + play.count100 + "\n" + "50: " + play.count50,true)
            .addField("Date", play.date)
            msg.channel.send(embed)
        })

    }else if(command == prefix + "osuTaikoBest"){
        var argswocommas = args;
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            //.setThumbnail("https://b.ppy.sh/thumb/" + play.beatmap_id + "l.jpg")
            .addField("Score", play.score)
            .addField("Combo", play.maxcombo)
            .addField("BeatmapID", play.beatmap_id)
            .addField("PP", play.pp)
            .addField("Rank", play.rank)
            .addField("Count Notes", "300: " + play.count300 + "\n" + "100: " + play.count100 + "\n" + "50: " + play.count50,true)
            .addField("Date", play.date)
            msg.channel.send(embed)
        })

    }else if(command == prefix + "osuCtbBest"){
        var argswocommas = args;
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            //.setThumbnail("https://b.ppy.sh/thumb/" + play.beatmap_id + "l.jpg")
            .addField("Score", play.score)
            .addField("Combo", play.maxcombo)
            .addField("BeatmapID", play.beatmap_id)
            .addField("PP", play.pp)
            .addField("Rank", play.rank)
            .addField("Count Notes", "300: " + play.count300 + "\n" + "100: " + play.count100 + "\n" + "50: " + play.count50,true)
            .addField("Date", play.date)
            msg.channel.send(embed)
        })

    }else if(command == prefix + "osuManiaBest"){
        var argswocommas = args;
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            //.setThumbnail("https://b.ppy.sh/thumb/" + play.beatmap_id + "l.jpg")
            .addField("Score", play.score)
            .addField("Combo", play.maxcombo)
            .addField("BeatmapID", play.beatmap_id)
            .addField("PP", play.pp)
            .addField("Rank", play.rank)
            .addField("Count Notes", "300: " + play.count300 + "\n" + "100: " + play.count100 + "\n" + "50: " + play.count50,true)
            .addField("Date", play.date)
            msg.channel.send(embed)
        })

    }else if(command=== prefix + "osuBeatmap"){
        osuApi.apiCall("/get_beatmaps",{
            b: parseInt(args[0])
        }).then(beatmap =>{
            var bm = beatmap[0];
            if(bm.approved == -2) bm.approved = "Graveyard";
            else if(bm.approved == -1) bm.approved = "WIP";
            else if(bm.approved == 0) bm.approved = "Pending";
            else if(bm.approved == 1) bm.approved = "Ranked";
            else if(bm.approved == 2) bm.approved = "Approved";
            else if(bm.approved == 3) bm.approved = "Qualified";
            else if(bm.approved == 4) bm.approved = "Loved";
            if(bm.approved_date == null) bm.approved_date = "*null*";
            if(bm.source == "" || bm.source == null) bm.source = "*null*";
            if(bm.tags == "" || bm.tags == null) bm.tags = "*null*";
            if(bm.artist == "" || bm.artist == null) bm.artist = "*null*";

            let embed = new discord.RichEmbed()
            .setColor([255, 58, 255])
            .setThumbnail("https://b.ppy.sh/thumb/" + bm.beatmapset_id + "l.jpg")
            .setTitle("osu!Beatmap")
            .addField("Title", bm.title)
            .addField("Artist", bm.artist)
            .addField("Creator", bm.creator)
            .addField("Status", bm.approved)
            .addField("IDs", "**BeatmapSet:** "+bm.beatmap_id+"\n**Beatmap:** "+bm.beatmap_id)
            .addField("BPM", bm.bpm)
            .addField("Difficulty", "Stars: " + bm.difficultyrating + "\n" + "HP: " + bm.diff_drain + "\n" + "OD: " + bm.diff_overall + "\n" + "AR: " + bm.diff_approach + "\n" + "CS: " + bm.diff_size)
            .addField("Source", bm.source)
            .addField("Difficulty Name", bm.version)
            .addField("Max Combo", bm.max_combo)

            msg.channel.send(embed);
        })

    }

    //Bot Owner

    else if(command === prefix + "disconnect") {
        if(msg.author.id == ownerID){
            var embed = new discord.RichEmbed()
            .setColor([255,0,0])
            .setAuthor(clien)
            msg.channel.send()
            client.destroy().then(() => process.exit());
        }
    }else if(command === prefix + "eval"){
        
        if(msg.author.id == ownerID){
            try {
                const code = args;
                let evaled = eval(code);
          
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
                
                var embed = new discord.RichEmbed()
                .setColor([255,0,0])
                .setTitle("Eval Command")
                .addField("Input", `\`\`\`${code}\`\`\``)
                .addField("Output:", `\`\`\`xl\n${clean(evaled)}\`\`\``)
                msg.channel.send(embed);
              } catch (err) {
                  var embed = new discord.RichEmbed()
                  .setTitle("ERROR")
                  .setDescription("\`\`\`xl\n"+clean(err)+"\`\`\`");
                msg.channel.send(embed);
              }
        }
    }
});
console.log("Starting...");
client.login(token).catch(e => console.log(e));
