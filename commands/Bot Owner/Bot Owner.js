const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
const db = require('dblapi.js');
class BotOwner {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 * @param {db} db
	 */
	constructor(msg, client, db) {
		this.disconnect = require('./disconnect');
		this.eval = require('./eval');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'disconnect': return new this.disconnect(msg, client);
			case 'eval': return new this.eval(msg, client, db);
		}
	}
}
module.exports = BotOwner;
