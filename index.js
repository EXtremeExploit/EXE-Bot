//#region Starting
console.log('Starting...');
//#endregion

//#region Data
const main = new (require('./scripts/')).Main();
//#endregion

//#region Require Modules
//#region Discord Module
const discord = require('discord.js');
//#endregion
//#region Discord Bots Module
const db = require('dblapi.js');
//#endregion
//#region Commands Modules
const commands = require('./commands/index');
const replies = require('./Replies/index');
//#endregion
//#endregion

//#region Modules Configuration

//#region Discord Client Configuration
const client = new discord.Client({
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

main.getEvents(client).all();
//#endregion
//#region Discord Bots Configuration
new db(main.getData().discordBotsToken(), client);
//#endregion
//#endregion
//#region Commands
client.on('message', (msg) => {
    new commands.Commands(client).Load(msg);
});
//#endregion

//#region Replies
new replies(client);
//#endregion
client.login(main.getData().token()).catch(e => console.log(e));
