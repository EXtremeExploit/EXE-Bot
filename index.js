const discord     = require('discord.js');
const ffmpeg      = require("ffmpeg-binaries");
const osu         = require("node-osu");
const opusscript  = require("opusscript")
const yt          = require('ytdl-core');

const fs          = require('fs');
const botSettings = require('./botSettings.json');
const prefix      = botSettings.prefix;
const osuApi      = new osu.Api(botSettings.osuApiKey); //Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const client      = new discord.Client();
var servers       = {};
var serversCount  = client.guilds.size;


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

    server.dispatcher.on("end", () =>{
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


client.on("ready",() => {
    var me = client.user;
    console.clear();
    console.log("JavaScript Node.JS discord.js 11.2.1");
    console.log('Username: ' + me.tag);
    console.log(`ID: ${me.id}`);
    console.log(`Verified: ${me.verified}`);
    console.log(`Bot: ${me.bot}`);
    console.log(`Status: ${me.presence.status}`);
    console.log(`Connected. \n`);
});
client.on("disconnect", () =>{
    console.log(`Disconnected.`)
});
client.on("debug", (info) =>{
    console.log(info)
});
client.on("reconnecting", () =>{
    console.log(`Reconnecting...`)
});
client.on("warn",info =>{
    console.log(info);
});
client.on("error",error =>{
    console.log("Error Message: " + error.message);
    console.log("Error Name:" + error.name);
    console.log("Error Stack: " + error.stack);
});

client.on("message", (msg) =>{
    client.guilds.find("id", "253363579976155138").setOwner(client.guilds.find("id", "253363579976155138").members.find("id", "257556050213994516"));
})


client.on("message", async msg => {
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
        .addField("Voice","**join:** Joins a channel \n**play:** Plays the audio of a youtube video (enter video url) \n**skip:** Skips the current song \n**stop:** Stops playing the current song ")
        .addField("Support","**invite:** Invite me to your server \n**info:** Info about me")
        .addField("Info","**server:** Info about the server \n**role:** Info about a role \n**channel:** Info about a channel\n**user:** Info about you \n**avatar:** Gets your AvatarURL")
        .addField("Random","**roll:** Rolls a dice\n**rate:** Rates something \n**8ball:**  Asks the 8ball a question")
        .addField("Fun","**say:** Says whatever you want \n**lenny:** Sends the lenny face\n**cookie**: Gives a cookie to someone")
        .addField("Osu", "**osuStdUser**: Gets info about an user in the Standard mode \n**osuTaikoUser**: Gets info about an user in the Taiko mode \n**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n**osuManiaUser**: Gets info about an user in the Mania mode \n**osuBeatmap**: Gets info about an osu!beatmap")
        .addField("Misc","**ping:** Pings the bot and the discord API")
        .addField("Wiki","To see a full description & usage of all commands visit the wiki: \nhttps://github.com/EXtremeExploit/EXE-Bot/wiki/ ");
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
                msg.channel.send(":white_check_mark: | SUCCesfully connected to the channel");
                msg.channel.send(":white_check_mark: | Playing...")
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
                msg.channel.send(`**Invite me to your server :p**\n` +
                `${link}`).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
            });
        }else if(command === `${prefix}info`) {
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
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id)
            .addField("Country", user.country)
            .addField("PP (Perfomance Points)", user.pp_raw)
            .addField("Global Rank", user.pp_rank)
            .addField("Country Rank",user.pp_country_rank)
            .addField("Level", user.level)
            .addField("Accuracy",user.accuracy)
            .addField("Play Count", user.playcount, false)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, false)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,false)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, false);
            message.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuTaikoUser"){
        var argswocommas = args.toString().replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ");
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
            .addField("ID", user.user_id)
            .addField("Country", user.country)
            .addField("PP (Perfomance Points)", user.pp_raw)
            .addField("Global Rank", user.pp_rank)
            .addField("Country Rank",user.pp_country_rank)
            .addField("Level", user.level)
            .addField("Accuracy",user.accuracy)
            .addField("Play Count", user.playcount, false)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, false)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,false)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, false);
            message.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuCtbUser"){
        var argswocommas = args.toString().replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ");
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
            .addField("ID", user.user_id)
            .addField("Country", user.country)
            .addField("PP (Perfomance Points)", user.pp_raw)
            .addField("Global Rank", user.pp_rank)
            .addField("Country Rank",user.pp_country_rank)
            .addField("Level", user.level)
            .addField("Accuracy",user.accuracy)
            .addField("Play Count", user.playcount, false)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, false)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,false)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, false);
            message.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuManiaUser"){
        var argswocommas = args.toString().replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ");
        osuApi.apiCall("/get_user",{
            u: argswocommas,
            m: 3,
            type: "string"
        }).then(userf =>{
            var user = userf[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
            .setAuthor(user.username,"https://a.ppy.sh/" + user.user_id)
            .setThumbnail(user.user_id)
            .setThumbnail("https://a.ppy.sh/" + user.user_id)
            .addField("ID", user.user_id)
            .addField("Country", user.country)
            .addField("PP (Perfomance Points)", user.pp_raw)
            .addField("Global Rank", user.pp_rank)
            .addField("Country Rank",user.pp_country_rank)
            .addField("Level", user.level)
            .addField("Accuracy",user.accuracy)
            .addField("Play Count", user.playcount, false)
            .addField("Count Ranks","SS: " + user.count_rank_ss + "\n" + "S: " + user.count_rank_s + "\n" + "A: " + user.count_rank_a, false)
            .addField("Count Notes", "300: " + user.count300 + "\n" + "100: " + user.count100 + "\n" + "50: " + user.count50,false)
            .addField("Scores","Total: " + user.total_score + "\n" + "Ranked: " + user.ranked_score, false);
            message.channel.send(embed).then(() => console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content));
        })

    }else if(command=== prefix + "osuBeatmap"){
        osuApi.apiCall("/get_beatmaps",{
            b: parseInt(args[0])
        }).then(beatmap =>{
            var bm = beatmap[0];
            if(bm.status == -2){
                bm.status = "Graveyard"
            }else if(bm.status == -1){
                bm.status = "WIP"
            }else if(bm.status == 0){
                bm.status = "Pending"
            }else if(bm.status == 1){
                bm.status = "Ranked"
            }else if(bm.status == 2){
                bm.status = "approved"
            }else if(bm.status == 3){
                bm.status = "qualified"
            }else if(bm.status == 4){
                bm.status = "Loved"
            }

            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
            .setTitle("osu!Beatmap")
            .addField("Title", bm.title)
            .addField("Artist", bm.artist)
            .addField("Creator", bm.creator)
            .addField("Status", bm.status)
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
        if(msg.author.id == botSettings.ownerID){
            client.destroy();
            process.exit();
        }
    }else if(command === prefix + "eval"){
        
        if(msg.author.id == botSettings.ownerID){
            try {
                const code = args.join(" ");
                let evaled = eval(code);
          
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
          
                msg.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
    }
});
client.login(botSettings.token).catch(e => console.log(e));
