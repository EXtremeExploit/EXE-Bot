const discord     = require('discord.js');
const fs          = require('fs');
const botSettings = require('./botSettings.json');
const yt          = require('ytdl-core');
const osu         = require("node-osu");
const prefix      = botSettings.prefix;
const osuApi      = new osu.Api("OSU_API_KEY"); // Get one at https://osu.ppy.sh/p/api, Documentation at https://osu.ppy.sh/api
const client      = new discord.Client({
                    apiRequestMethod: 'sequential',
                    messageCacheMaxSize: 200,
                    messageCacheLifetime: 0,
                    messageSweepInterval: 0,
                    fetchAllMembers: false,
                    disableEveryone: false,
                    sync: false,
                    restWsBridgeTimeout: 5000,
                    restTimeOffset: 500
                    });
var servers       = {};
var serversCount  = client.guilds.size;


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
})
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
        .setTitle(`${client.user.username} Commands`)
        .addField("Voice","**join:** Joins a channel \n**play:** Plays the audio of a youtube video (enter video url) \n**skip:** Skips the current song \n**stop:** Stops playing the current song ")
        .addField("Support","**invite:** Invite me to your server \n**info:** Info about me")
        .addField("Info","**server:** Info about the server \n**role:** Info about a role \n**channel:** Info about a channel\n**user:** Info about you \n**avatar:** Gets your AvatarURL")
        .addField("Random","**roll:** Rolls a dice\n**rate:** Rates something")
        .addField("Fun","**say:** Says whatever you want \n**lenny:** Sends the lenny face")
        .addField("Osu", "**osuStdUser**: Gets info about an user in the Standard mode \n**osuTaikoUser**: Gets info about an user in the Taiko mode \n**osuCtbUser**: Gets info about an user in the CatchTheBeat mode \n**osuManiaUser**: Gets info about an user in the Mania mode \n")
        .addField("Misc","**ping:** Pings the bot and the discord API");
        msg.channel.send(embed);
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
    }
        //Voice

        else if(command === `${prefix}join`) {
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            let embed = new discord.RichEmbed()
            .setColor("#000000");
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                  .then(connection => {
                    msg.channel.send();
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
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            var server = servers[message.guild.id];
    
            if(server.dispatcher) server.dispatcher.end();
        }else if(command=== prefix + "stop"){
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            var server = servers[message.guild.id];
    
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        }

        //Support

        else if(command === `${prefix}invite`){
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            client.generateInvite(["ADMINISTRATOR"]).then(link =>{
                msg.channel.send(`**Invite me to your server :p**\n` +
                `${link}`)
            });
        }else if(command === `${prefix}info`) {
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
            msg.channel.send(`I am **${client.user.username}**\n`+
        `Im made by \`EXtremeExploit#1133\` in Node.JS on the discord.js 11.2.1 library\n`+
        `To see a full list of my commands type \`/help\``);
        }

        //Info

        else if(command === `${prefix}server`) {
            console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
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
    
            msg.channel.send(embed);
    }else if(command === `${prefix}role`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        var role = msg.guild.roles.find(input => input.name === args[0]);
        let embed = new discord.RichEmbed()
        .setColor("#0000ff")
        .addField("Name",role.name)
        .addField("ID",role.id)
        .addField("Hex Color", role.hexColor)
        .addField("Color",role.color)
        .addField("Position(in the API)",role.position)
        .addField("Posistion( form the role manager)",role.calculatedPosition)
        .addField("Mentionable",role.mentionable)
        .addField("Managed by a Bot",role.managed)
        .addField("Member Count",role.members.size);

        msg.channel.send(embed);
    }
    else if(command=== prefix + "channel"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        let channel = msg.mentions.channels.first();
        let embed = new discord.RichEmbed()
        .setColor("#0000ff")
        .setTitle(channel.name)
        .addField("Name",channel.name)
        .addField("ID",channel.id)
        .addField("Position(The position of the channel in the list)",channel.position)
        .addField("Calculated Position",channel.calculatedPosition)
        .addField("Type",channel.type)
        .addField("Created At",channel.createdAt);
        msg.channel.send(embed);
    }else if(command === `${prefix}user`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        if(args === "" || args == null){
            let embed = new discord.RichEmbed()        
            .setDescription(`${msg.author.username} info`)
            .setColor("#ff0000")
            .addField("Full Username", msg.author.username + "#" + msg.author.discriminator)
            .addField("ID", msg.author.id)
            .addField("Created at", msg.author.createdAt.toUTCString())
            .addField("Bot", msg.author.bot)
            .addField("Avatar", msg.author.avatar)
            .addField("AvatarURL", msg.author.avatarURL)
            .addField("Tag", msg.author.tag)
            .setAuthor(msg.author.username,msg.author.avatarURL)
            .setThumbnail(msg.author.avatarURL);
            msg.channel.send(embed);
        }else{
            var user = msg.mentions.users.first();
            let embed = new discord.RichEmbed()        
            .setDescription(`${user.username} info`)
            .setColor("#ff0000")
            .addField("Full Username", user.username + "#" + user.discriminator)
            .addField("ID", user.id)
            .addField("Created at", user.createdAt.toUTCString())
            .addField("Bot", user.bot)
            .addField("Avatar", user.avatar)
            .addField("AvatarURL", user.avatarURL)
            .addField("Tag", user.tag)
            .setThumbnail(user.avatarURL);
            msg.channel.send(embed);
        }        
    }else if(command == "avatar") {
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        msg.channel.send(msg.author.avatarURL);
    }

    //Random

    else if(command===`${prefix}roll`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        const roll = Math.floor(Math.random() * 6) + 1;
        msg.channel.send(`:information_source: | You rolled a: ${roll} @${msg.author.tag}`);
    }else if(command === `${prefix}rate`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        const rate = Math.floor(Math.random() * 11);
        msg.channel.send(`:thinking: | I'd rate `+args+` a: ${rate} ${msg.author.name}`);
    }

    //Fun

    else if(command=== `${prefix}say`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        let thing2say = args.toString(); 
        msg.channel.send(thing2say.replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," "));
    }else if(command===`${prefix}lenny`){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        msg.channel.send('( ͡° ͜ʖ ͡°)')
    }else if(command=== prefix + "cookie"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        if(msg.mentions.users || msg.mentions.members){
        msg.channel.send(":cookie:  | <@" + msg.author.id + "> Has given a cookie to <@" + msg.mentions.members.first().user.id + ">");
        }else{
            msg.channel.send(":negative_squared_cross_mark:  |  <@" + msg.author.id + ">, the correct usage is:  /cookie <user>" +
            ":white_small_square:  |  e.g. /cookie @somebody");
        }
    }

    //Misc

    
    else if(command === `${prefix}ping`) {
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        const pingMsg = await msg.channel.send(':information_source: | Pinging...');
        pingMsg.edit(`:information_source: | Pong! | **${pingMsg.createdTimestamp - msg.createdTimestamp}ms.** | ${client.ping}ms.`)
    }

    //Osu

    else if(command=== prefix + "osuStdUser"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
        var argswocommas = args.toString().replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ");
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
            message.channel.send(embed)
        })

    }else if(command=== prefix + "osuTaikoUser"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
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
            message.channel.send(embed)
        })

    }else if(command=== prefix + "osuCtbUser"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
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
            message.channel.send(embed)
        })

    }else if(command=== prefix + "osuManiaUser"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
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
            message.channel.send(embed)
        })

    }else if(command=== prefix + "osuBeatmap"){
        console.log("[" + new Date + "] [" + msg.guild.name + "] [" + msg.channel.name + "] " + msg.author.username + ": " + msg.content);
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

            msg.channel.send(embed);
        })

    }
    
    
    /*else if(command === prefix + "osuStdUserBest"){
        var argswocommas = args.toString().replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ").replace(","," ");
        osuApi.apiCall("/get_user_best",{
            u: argswocommas,
            m: 0,
            limit: 1,
            type: "string"
        }).then(playf =>{
            var play = play[0];
            let embed = new discord.RichEmbed()
            .setColor("#ff3aff")
            .setTitle("osu!user Best")
            .addField("PP", play.pp)
            .addField("BeatmapID", play.beatmap_id)
            .addField("Score", play.score)
            .addField("Max Combo", play.maxcombo)
            .addField("Date", play.date)
            .addField("Grade", play.rank)
            .addField("FC", play.perfect)
            .addField("Count Notes", "300: "+ play.count300 + "\n" + "Geki: " + play.countgeki + "\n" + "100: " + play.count100 + "\n" + "Katu: " + play.countkatu + "\n" + "50:" + play.count50 + "\n" + "Misses" + play.countmiss);


            msg.channel.send(embed);
        })
    }*/

    //Bot Owner

    else if(command === `${prefix}disconnect`) {
        if(msg.author.id == 257556050213994516) {
            client.destroy();
            process.exit();
        }
    }
});
client.login(botSettings.token);
