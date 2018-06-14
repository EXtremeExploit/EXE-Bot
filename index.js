require('dotenv').config({
    path: './json/.env'
});
console.log('Starting...');
const main = new (require('./scripts/')).Main();
const discord = require('discord.js');
var _db = require('dblapi.js');
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
if (main.getData().discordBots().enabled == true || main.getData().discordBots().enabled == 'true') {
    var db = new _db(main.getData().discordBots().token, client);
    setTimeout((e) => {
        db = new _db(main.getData().discordBots().token, client);
    }, 900000);
}
client.on('message', async (msg) => {
    const commands = require('./commands/index');
    new commands.Commands(client, db).Load(msg);
});

const replies = require('./Replies/index');
new replies(client);
client.login(main.getData().token()).catch(e => console.log(e));
