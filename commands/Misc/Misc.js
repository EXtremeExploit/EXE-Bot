const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const { Message } = require('discord.js');
class Misc {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.ping = require('./ping');
		this.pong = require('./pong');
		this.uptime = require('./uptime');
		this.wiki = require('./wiki');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'ping': return new this.ping(msg, client);
			case 'pong': return new this.pong(msg, client);
			case 'uptime': return new this.uptime(msg, client);
			case 'wiki': return new this.wiki(msg, client);
		}
	}
}
module.exports = Misc;
