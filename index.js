const discord     = require('discord.js');
const ffmpeg      = require("ffmpeg-binaries");
const osu         = require("node-osu");
const opusscript  = require("opusscript")
const yt          = require('ytdl-core');

const fs          = require('fs');
const _settings   = require("./botSettings.js");
const settings    = new _settings;

var token         = settings.token();
var prefix        = settings.prefix();
var osuApiKey     = settings.osuApiKey();
var ownerID       = settings.ownerID();
var allEvents     = settings.allEvents();
var debug         = settings.debug();
var servers       = {};

const osuApi      = new osu.Api(osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
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
        //host: "",
        cdn: 'https://cdn.discordapp.com'
    }

});


function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
  
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(yt(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", () => {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


client.on("ready",() => {
    var me = client.user;
    var serversCount  = client.guilds.size;
    console.clear();
    console.log("JavaScript Node.JS discord.js 11.2.1");
    console.log('Username: ' + me.tag);
    console.log(`ID: ${me.id}`);
    console.log(`Verified: ${me.verified}`);
    console.log(`Bot: ${me.bot}`);
    console.log(`Status: ${me.presence.status}`);
    console.log("Servers: "+serversCount);
    console.log(client.guilds.forEach(guild => console.log(guild.name))+"\n");
    console.log(`Connected. \n`);
    me.setGame("e!help | e!invite | "+serversCount+" Servers")
});
client.on("disconnect", () =>{
    console.log(`Disconnected.`)
});
client.on("reconnecting", () =>{
    console.log(`Reconnecting...`)
});
client.on("warn",info =>{
    console.log(info);
});
if(allEvents){
client.on("channelCreate",ch => console.log("[ "+new Date()+" ] [CHANNEL_CREATE]"));
client.on("channelDelete",ch => console.log("[ "+new Date()+" ] [CHANNEL_DELETE]"));
client.on("channelPinsUpdate",ch => console.log("[ "+new Date()+" ] [CHANNEL_PINS_UPDATE]"));
client.on("channelUpdate",ch => console.log("[ "+new Date()+" ] [CHANNEL_UPDATE]"));
client.on("clientUserGuildSettingsUpdate",e => console.log("[ "+new Date()+" ] [CLIENT_USER_GUILD_SETTINGS_UPDATE]"));
client.on("clientUserSettingsUpdate",e => console.log("[ "+new Date()+" ] [CLIENT_USER_SETTINGS_UPDATE]"));
client.on("emojiCreate",e => console.log("[ "+new Date()+" ] [EMOJI_CREATE]"));
client.on("emojiDelete",e => console.log("[ "+new Date()+" ] [EMOJI_DELETE]"));
client.on("emojiUpdate",e => console.log("[ "+new Date()+" ] [EMOJI_UPDATE]"));
client.on("guildBanAdd",e => console.log("[ "+new Date()+" ] [GUILD_BAN_ADD]"));
client.on("guildBanRemove",e => console.log("[ "+new Date()+" ] [GUILD_BAN_REMOVE]"));
client.on("guildCreate",e => console.log("[ "+new Date()+" ] [GUILD_CREATE]"));
client.on("guildDelete",e => console.log("[ "+new Date()+" ] [GUILD_DELETE]"));
client.on("guildMemberAdd",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_ADD]"));
client.on("guildMemberAvailable",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_AVAILABLE]"));
client.on("guildMemberRemove",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_REMOVE]"));
client.on("guildMembersChunk",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_CHUNK]"));
client.on("guildMemberSpeaking",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_SPEAKING]"));
client.on("guildMemberUpdate",e => console.log("[ "+new Date()+" ] [GUILD_MEMBER_UPDATE]"));
client.on("guildUnavailable",e => console.log("[ "+new Date()+" ] [GUILD_UNAVAILABLE]"));
client.on("guildUpdate",e => console.log("[ "+new Date()+" ] [GUILD_UPDATE]"));
client.on("messageDelete",e => console.log("[ "+new Date()+" ] [MESSAGE_DELETE]"));
client.on("messageDeleteBulk",e => console.log("[ "+new Date()+" ] [MESSAGE_DELETE_BULK]"));
client.on("messageReactionAdd",e => console.log("[ "+new Date()+" ] [MESSAGE_REACTION_ADD]"));
client.on("messageReactionRemove",e => console.log("[ "+new Date()+" ] [MESSAGE_REACTION_REMOVE]"));
client.on("messageReactionRemoveAll",e => console.log("[ "+new Date()+" ] [MESSAGE_REACTION_REMOVE_ALL]"));
client.on("messageUpdate",e => console.log("[ "+new Date()+" ] [MESSAGE_UPDATE]"));
client.on("presenceUpdate",e => console.log("[ "+new Date()+" ] [PRESENCE_UPDATE]"));
client.on("resume",e => console.log("[ "+new Date()+" ] [RESUME]"));
client.on("roleCreate",e => console.log("[ "+new Date()+" ] [ROLE_CREATE]"));
client.on("roleDelete",e => console.log("[ "+new Date()+" ] [ROLE_DELETE]"));
client.on("roleUpdate",e => console.log("[ "+new Date()+" ] [ROLE_UPDATE]"));
client.on("typingStart",e => console.log("[ "+new Date()+" ] [TYPING_START]"));
client.on("typingStop",e => console.log("[ "+new Date()+" ] [TYPING_STOP]"));
client.on("userNoteUpdate",e => console.log("[ "+new Date()+" ] [USER_NOTE_UPDATE]"));
client.on("userUpdate",e => console.log("[ "+new Date()+" ] [USER_UPDATE]"));
client.on("voiceStateUpdate",e => console.log("[ "+new Date()+" ] [VOICE_STATE_UPDATE]"));
}
if(debug){
    client.on("debug",e => console.log(e));
}

client.on("error",error =>{
    console.log("Error Message: " + error.message);
    console.log("Error Name:" + error.name);
    console.log("Error Stack: " + error.stack);
});


client.on("message", async (msg) => {
    let messageArray = msg.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    var message = msg;
    if(msg.author.bot) return;
    if(msg.channel.type === "dm" || msg.channel.type == "group") return;
    if(!command.startsWith(prefix)) return;

    if(command === prefix + "help") {
        var embed = new discord.RichEmbed()
        .setColor("#0000ff")
        .setThumbnail(client.user.avatarURL)
        .setTitle(`${client.user.username} Commands`)
        .addField("Voice","**join:** Joins a channel \n**play:** Plays the audio of a youtube video \n**skip:** Skips the current song \n**stop:** Stops playing the current song ")
        .addField("Support","**invite:** Invite me to your server \n**info:** Info about me",true)
        .addField("Info","**server:** Info about the server \n**role:** Info about a role \n**channel:** Info about a channel\n**user:** Info about you \n**avatar:** Gets your AvatarURL",true)
        .addField("Random","**roll:** Rolls a dice\n**rate:** Rates something \n**8ball:**  Asks the 8ball a question",true)
        .addField("Fun","**say:** Says whatever you want \n**lenny:** Sends the lenny face\n**cookie**: Gives a cookie to someone",true)
        .addField("Osu", "**osuStdUser**: Gets info about an user in the Standard mode \n**osuTaikoUser**: Gets info about an user in the Taiko mode \n**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n**osuManiaUser**: Gets info about an user in the Mania mode \n**osuBeatmap**: Gets info about an osu!beatmap", true)
        .addField("Misc","**ping:** Pings the bot and the discord API",true)
        .addField("Wiki","[Wiki](https://github.com/EXtremeExploit/EXE-Bot/wiki/)\n[Wiki: Commands](https://github.com/EXtremeExploit/EXE-Bot/wiki/Commands)");
        msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }
        //Voice

        else if(command === `${prefix}join`) {
            let embed = new discord.RichEmbed()
            .setColor("#000000");
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                  .then(connection => {
                    msg.channel.send().then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
                  })
                  .catch(console.log);
              } else {
                msg.reply(':no_entry_sign: | You need to join a voice channel first');
              }
        }else if (command === `${prefix}play`){
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            if(!args[0] || args[0] === "https://" || args[0] === "http://" ) {
                message.channel.send(":no_entry_sign: | Please provide a link");
                return;
            }
            if(!message.member.voiceChannel) {
                message.channel.send(":no_entry_sign: | You need to join a voice channel first")
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
    
            if(server.dispatcher) server.dispatcher.end().then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
        }else if(command=== prefix + "stop"){
            var server = servers[message.guild.id];
    
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect()
            .then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
        }

        //Support

        else if(command === prefix +"invite"){
            client.generateInvite(["ADMINISTRATOR"]).then(link =>{
                msg.channel.send(`**Invite me to your server :p**\n${link}`)
                .then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
            });
        }else if(command === `${prefix}info`) {
            let embed = new discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setColor("#ff0000")
            .setFooter(client.user.username + "By" + client.fetchUser(ownerID).then(user => user.username))
            .setThumbnail(client.user.avatarURL)
            .addField("Libraries & languge", "JavaScript: Node.JS\n**Libraries**\ndiscord.js\nnode-osu\nytdl-core",true)
            .addField("", "**CPU Usage:** " + process.cpuUsage + "\n**Memory Usage:** " + process.memoryUsage,true)
            msg.channel.send(`I am **${client.user.username}**\n`+
        `Im made by \`EXtremeExploit#1133\` in Node.JS on the discord.js 11.2.1 library\n`+
        `To see a full list of my commands type \`${prefix}help\``).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
        }

        //Info

        else if(command === `${prefix}server`) {
            var server = msg.guild;
            let embed = new discord.RichEmbed()
            .setAuthor(msg.guild.name,msg.guild.iconURL)
            .setColor("#0000ff")
            .setThumbnail(server.iconURL)
            .addField("ID", server.id)
            .addField("Region",server.region)
            .addField("AFK",server.afkChannel + "\n" + server.afkTimeout + " seconds")
            .addField("Default Channel",server.defaultChannel)
            .addField("Members",server.memberCount)
            .addField("Owner",server.owner)
            .addField("Owner ID",server.ownerID)
            .addField("Verification Level",server.verificationLevel)
            .addField("Role Count",server.roles.size)
            .addField("Available",server.available);
    
            msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }else if(command === `${prefix}role`){
        var role = msg.mentions.roles.first();
        let embed = new discord.RichEmbed()
        .setColor("#0000ff")
        .addField("Name",role.name)
        .addField("ID",role.id)
        .addField("Hex Color", role.hexColor)
        .addField("Position",role.position + 1)
        .addField("Mentionable",role.mentionable)
        .addField("Managed by a Bot",role.managed)
        .addField("Hoisted", role.hoist)
        .addField("Member Count",role.members.size);

        msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }
    else if(command=== prefix + "channel"){
        let channel = msg.mentions.channels.first();
        let embed = new discord.RichEmbed()
        .setColor("#0000ff")
        .setTitle(channel.name)
        .addField("Name",channel.name)
        .addField("ID",channel.id)
        .addField("Calculated Position",channel.calculatedPosition + 1)
        .addField("Type",channel.type)
        .addField("Created At",channel.createdAt);
        msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }else if(command === `${prefix}user`){
        if(!message.mentions.members){
            var user = msg.member;
            let embed = new discord.RichEmbed()        
            .setDescription(`${user.user.username} info`)
            .setColor("#ff0000")
            .addField("Full Username", user.user.tag)
            .addField("ID", user.id)
            .addField("Hoist Role", user.hoistRole)
            .addField("Highest Role", user.highestRole)
            .addField("Color Role", user.colorRole)
            .addField("Status",user.presence.status)            
            .addField("Playing",user.presence.game)
            .addField("Created at", user.user.createdAt.toUTCString())
            .addField("Joined at", user.joinedAt.getUTCDate())
            .addField("Bot", user.user.bot)
            .addField("Avatar", user.user.avatar)
            .addField("AvatarURL", user.user.avatarURL)
            .setAuthor(user.user.username,user.user.avatarURL)
            .setThumbnail(user.user.avatarURL);
            msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
        }else{
            var user = msg.mentions.members.first();
            let embed = new discord.RichEmbed()        
            .setDescription(`${user.user.username} info`)
            .setColor("#ff0000")
            .addField("Full Username", user.user.tag)
            .addField("ID", user.id)
            .addField("Hoist Role", user.hoistRole)
            .addField("Highest Role", user.highestRole)
            .addField("Color Role", user.colorRole)
            .addField("Status",user.presence.status)            
            .addField("Playing",user.presence.game)
            .addField("Created at", user.user.createdAt.toUTCString())
            .addField("Joined at", user.joinedAt.getUTCDate())
            .addField("Bot", user.user.bot)
            .addField("Avatar", user.user.avatar)
            .addField("AvatarURL", user.user.avatarURL)
            .setAuthor(user.user.username,user.user.avatarURL)
            .setThumbnail(user.user.avatarURL);
            msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
        }        
    }else if(command == prefix + "avatar") {
        let embed = new discord.RichEmbed()
        .setImage(msg.author.displayAvatarURL)
        .setColor("#ff0000")
        .setURL(msg.author.displayAvatarURL)
        .setDescription(msg.author.username + "'s Avatar");
        msg.channel.send().then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }

    //Random

    else if(command===`${prefix}roll`){
        const roll = Math.floor(Math.random() * 6) + 1;
        msg.channel.send(`:information_source: | You rolled a: ${roll} <@${msg.author.id}>`).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }else if(command === `${prefix}rate`){
        const rate = Math.floor(Math.random() * 11);
        msg.channel.send(`:thinking: | I'd rate `+args+` a: ${rate} ${msg.author.name}`).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }else if(command=== prefix + "8ball"){
        var response = [
            "Nope", // 0
            "Yes", // 1
            "Of Course", //2
            "Never", // 3
            "Not looking so good...", //4
            "Concentrate and ask again", //5
            "Yes, definitely", //6
            "Better not tell you now"
        ];
        msg.channel.send(":8ball: | "+ response[Math.floor(Math.random() * response.length)] + " | "+ msg.author.username).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }

    //Fun

    else if(command=== `${prefix}say`){
        let thing2say = args.join(" "); 
        msg.channel.send(thing2say).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }else if(command===`${prefix}lenny`){
        msg.channel.send('( ͡° ͜ʖ ͡°)').then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
    }else if(command=== prefix + "cookie"){
        msg.channel.send(":cookie:  | <@" + msg.author.id + "> Has given a cookie to <@" + msg.mentions.members.first().user.id + ">").then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));;
    }

    //Misc

    
    else if(command === `${prefix}ping`) {
        const pingMsg = await msg.channel.send(':information_source: | Pinging...');
        pingMsg.edit(`:information_source: | Pong! | **${pingMsg.createdTimestamp - msg.createdTimestamp}ms.** | ${client.ping}ms.`).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
    }

    //Osu

    else if(command=== prefix + "osuStdUser"){
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 0,
            type: "string",
            event_days: 4
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
            message.channel.send(embed).catch(e => msg.channel.send(":no_entry: | Could not found user")).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuTaikoUser"){
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 1,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
            message.channel.send(embed).catch(e => msg.channel.send(":no_entry: | Could not found user")).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuCtbUser"){
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 2,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
            message.channel.send(embed).catch(e => msg.channel.send(":no_entry: | Could not found user")).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuManiaUser"){
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 3,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            if(!user == undefined){
                let embed = new discord.RichEmbed()
                .setColor("#ff3aff")
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
            message.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
            }else{
                msg.channel.send("Could not found user...");
            }
        })

    }else if(command == prefix + "osuStdBest"){
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
        var argswocommas = args.join(" ");
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playF =>{
            var play = playF[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
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
            if(bm.status == -2) bm.status = "Graveyard";
            else if(bm.status == -1) bm.status = "WIP";
            else if(bm.status == 0) bm.status = "Pending";
            else if(bm.status == 1) bm.status = "Ranked";
            else if(bm.status == 2) bm.status = "Approved";
            else if(bm.status == 3) bm.status = "Qualified";
            else if(bm.status == 4) bm.status = "Loved";
            if(bm.source == "" || bm.source == null) bm.source = "*null*";
            if(bm.tags == "" || bm.tags == null) bm.tags = "*null*";

            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
            .setThumbnail("https://b.ppy.sh/thumb/" + bm.beatmapset_id + "l.jpg")
            .setTitle("osu!Beatmap")
            .addField("Title", bm.title)
            .addField("Artist", bm.artist)
            .addField("Creator", bm.creator)
            .addField("Status", bm.status)
            .addField("IDs", "**BeatmapSet:** "+bm.beatmap_id+"\n**Beatmap:** "+bm.beatmap_id)
            .addField("BPM", bm.bpm)
            .addField("Difficulty", "Stars: " + bm.difficultyrating + "\n" + "HP: " + bm.diff_drain + "\n" + "OD: " + bm.diff_overall + "\n" + "AR: " + bm.diff_approach + "\n" + "CS: " + bm.diff_size)
            .addField("Source", bm.source)
            .addField("Difficulty Name", bm.version)
            .addField("Max Combo", bm.max_combo)

            msg.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }

    //Bot Owner

    else if(command === `${prefix}disconnect`) {
        if(msg.author.id == ownerID){
            client.destroy().then(() => process.exit());
        }
    }else if(command === prefix + "eval"){
        
        if(msg.author.id == ownerID){
            try {
                const code = args.join(" ");
                let evaled = eval(code);
          
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
                
                var embed = new discord.RichEmbed()
                .setColor("#ff0000")
                .setTitle("Eval Command")
                .addField("Input", `\`\`\`${code}\`\`\``)
                .addField("Output:", `\`\`\`xl\n${clean(evaled)}\`\`\``)
                msg.channel.send(embed);
              } catch (err) {
                msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
    }
});
client.login(token).catch(e => console.log(e));
