//#region Starting
console.log('Starting...');
//#endregion

//#region Data
const main = new (require('./scripts/')).Main();
//#endregion

//#region Discord
const discord = require('discord.js');
const db = require('dblapi.js');
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

new db(main.getData().discordBotsToken(), client);
//#endregion

//#region Commands
client.on('message', (msg) => {
    const commands = require('./commands/index');
    new commands.Commands(client).Load(msg);
});
//#endregion

//#region Replies
const replies = require('./Replies/index');
new replies(client);
//#endregion
client.login(main.getData().token()).catch(e => console.log(e));
