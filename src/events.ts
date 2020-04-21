import discord from 'discord.js';
import config from './config.js';
import { commandsArray } from './commands.js';
import { repliesArray } from './replies.js'
let owner = new config().GetOwner();
let prefix = new config().GetPrefix();

export default class {
	client: discord.Client;

	constructor(client: discord.Client) {
		this.client = client;

		this.Disconnect();
		this.Error();
		this.RateLimit();
		this.Ready();
		this.Reconnecting();
		this.Warn();
	}

	setPresence(){
		this.client.user.setPresence({
			status: 'online',
			afk: false,
			activity: {
				name: prefix + 'help | ' + prefix + 'invite | S: ' + this.client.guilds.cache.size,
				type: 'WATCHING'
			}
		});
	}

	Ready() {
		this.client.on(`ready`, () => {
			let me = this.client.user;

			console.log(`==================================================`);
			console.log(`TS=>JS; Node.JS ${process.version}; discord.js v${discord.version}`);
			console.log(`ID;TAG: ${me.id};${me.tag}`);
			console.log(`OwnerID;OwnerTag: ${owner.id};${owner.tag}`);
			console.log(`Commands;Replies: ${commandsArray.length};${repliesArray.length}`);
			console.log(`Prefix;Servers: ${prefix};${this.client.guilds.cache.size} Servers`)
			console.log(`==================================================`);

			this.client.setInterval(() => {
				this.setPresence();
			}, 20000);
			this.setPresence();

		});
	}
	Disconnect() {
		this.client.on(`disconnect`, () => console.log(`[${new Date}] [DISCONNECTED]`));
	}
	Reconnecting() {
		this.client.on(`reconnecting`, () => console.log(`[${new Date}] [RECONNECTING...]`));
	}

	RateLimit() {
		this.client.on(`rateLimit`, (e) => {
			console.log(`====================RATE LIMIT====================`);
			console.log(`${e.method} ${e.path}`);
			console.log(`Limit;Timeout: ${e.limit};${e.timeout}`);
			console.log(`Route: ${e.route}`);
			console.log(`==================================================`);
		});
	}
	Warn() {
		this.client.on(`warn`, (info) => {
			console.log(`====================WARN====================`);
			console.warn(info);
			console.log(`============================================`);
		});
	}
	Error() {
		this.client.on(`error`, (error) => {
			console.log(`====================ERROR====================`);
			console.log(`Error Message: ${error.message}`);
			console.log(`Error Name: ${error.name}`);
			console.log(`Error Stack: ${error.stack}`);
			console.log(`=============================================`);
		});
	}
}