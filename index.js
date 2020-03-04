console.log('Starting...');
//Clear memory
// eslint-disable-next-line no-unused-vars
require('fs').writeFile('./json/memory.json', '{"rr":{"channels":[]}}', (err, data) => {
	if (err) {
		console.log(err);
	}
});
require('dotenv').config({
	path: './json/.env'
});

const main = new (require('./scripts/scripts')).Main();
const discord = require('discord.js');
var _db = require('dblapi.js');
const client = new discord.Client({
	apiRequestMethod: 'sequential',
	shardId: 0,
	shardCount: 0,
	messageCacheMaxSize: 200,
	messageCacheLifetime: 0,
	messageSweepInterval: 3600,
	fetchAllMembers: false,
	disableEveryone: false,
	sync: false,
	restWsBridgeTimeout: 5000,
	restTimeOffset: 0,
	disabledEvents: [],
	ws: {
		large_threshold: 300,
		compress: true
	},
	http: {
		version: 7,
		cdn: 'https://cdn.discordapp.com',
		host: 'https://discordapp.com'
	}
});
//Start events and console log information
main.getEvents(client).all();
//Get connection to discordbots.org
var db;
if (main.getData().discordBots().enabled == true || main.getData().discordBots().enabled == 'true') {
	db = new _db(main.getData().discordBots().token, client);
}
//Reset the bot every 23 hours(82800000ms)
setInterval(function () {
	process.exit();
}, 82800000);
//Initialize Commands and replies
const commands = require('./commands/commands');
new commands.Commands(client, db).Load();
const replies = require('./replies/replies');
new replies(client);
//Login-In
client.login(main.getData().token()).catch((e) => console.log(e));
