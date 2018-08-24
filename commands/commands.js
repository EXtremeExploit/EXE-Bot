const main = new (require('../scripts/scripts')).Main();
const data = main.getData();
const _db = require('dblapi.js');
const discord = require('discord.js');
const { Client } = discord;

class Commands {
	/**
	 * @param {Client} client 
	 * @param {_db} db
	 */
	constructor(client, db) {
		this.client = client;
		this.db = db;
		this.botOwner = require('./Bot Owner/Bot Owner');
		this.fun = require('./Fun/Fun');
		this.games = require('./Games/Games');
		this.info = require('./Info/Info');
		this.misc = require('./Misc/Misc');
		this.moderation = require('./Moderation/Moderation');
		this.nsfw = require('./NSFW/NSFW');
		this.random = require('./Random/Random');
		this.support = require('./Support/Support');
		this.utility = require('./Utility/Utility');
	}
	BotOwner(msg) {
		return new this.botOwner(msg, this.client, this.db);
	}
	Fun(msg) {
		return new this.fun(msg, this.client);
	}
	Games(msg) {
		return new this.games(msg, this.client);
	}
	Info(msg) {
		return new this.info(msg, this.client);
	}
	Misc(msg) {
		return new this.misc(msg, this.client);
	}
	NSFW(msg) {
		return new this.nsfw(msg, this.client);
	}
	Moderation(msg) {
		return new this.moderation(msg, this.client);
	}
	Random(msg) {
		return new this.random(msg, this.client);
	}
	Support(msg) {
		return new this.support(msg, this.client);
	}
	Utility(msg) {
		return new this.utility(msg, this.client);
	}
	/**
	 * Loads the commands
	 */
	Load() {
		this.client.on('message', async (msg) => {
			if (!msg.guild) return;
			if (msg.author.bot) return;
			if (!msg.content.startsWith(data.prefix())) return;
			if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') == true) {
				//#region Help Command Load
				var help = require('./Support/help');
				new help(this.client, msg);
				//#endregion
				if (data.commands().categories.BotOwner == true || data.commands().categories.BotOwner == 'true') {
					this.BotOwner(msg);
				}
				if (data.commands().categories.Fun == true || data.commands().categories.Fun == 'true') {
					this.Fun(msg);
				}
				if (data.commands().categories.Games == true || data.commands().categories.Games == 'true') {
					this.Games(msg);
				}
				if (data.commands().categories.Info == true || data.commands().categories.Info == 'true') {
					this.Info(msg);
				}
				if (data.commands().categories.Misc == true || data.commands().categories.Misc == 'true') {
					this.Misc(msg);
				}
				if (data.commands().categories.Moderation == true || data.commands().categories.Moderation == 'true') {
					this.Moderation(msg);
				}
				if (data.commands().categories.NSFW == true || data.commands().categories.NSFW == 'true') {
					this.NSFW(msg);
				}
				if (data.commands().categories.Random == true || data.commands().categories.Random == 'true') {
					this.Random(msg);
				}
				if (data.commands().categories.Support == true || data.commands().categories.Support == 'true') {
					this.Support(msg);
				}
				if (data.commands().categories.Utility == true || data.commands().categories.Utility == 'true') {
					this.Utility(msg);
				}
			} else return;
		});
	}

}
exports.Commands = Commands;
exports.Main = main;
