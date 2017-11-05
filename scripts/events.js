class Events {
    constructor(client,debug,allEvents,prefix) {
        client.on("ready",() => {
            var me = client.user;
            console.clear();
            console.log("JavaScript Node.JS discord.js 11.2.1");
            console.log('Username: ' + me.tag);
            console.log(`ID: ${me.id}`);
            console.log(`Verified: ${me.verified}`);
            console.log(`Bot: ${me.bot}`);
            console.log(`Status: ${me.presence.status}`);
            console.log("Servers: "+ client.guilds.size);
            console.log(client.guilds.forEach(guild => console.log(guild.name))+"\n");
            console.log(`Connected. \n`);
            me.setPresence({
                status: "online",
                afk: false,
                game: {
                    name: prefix+"help | "+prefix+"invite",
                    url: "https://www.twitch.tv/extremeexploit_"
                }
            });
        });
        client.on("disconnect", () => console.log("[ "+ new Date +" ] [DISCONNECTED]"));
        client.on("reconnecting", () => console.log("[ "+ new Date +" ] [RECONNECTING...]"));
        client.on("warn",info => console.log(info));
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
    }
}

module.exports = Events;
