const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
class Info {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.avatar = require('./avatar');
		this.channel = require('./channel');
		this.emoji = require('./emoji');
		this.role = require('./role');
		this.server = require('./server');
		this.stats = require('./stats');
		this.user = require('./user');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'avatar': return new this.avatar(msg, client);
			case 'channel': return new this.channel(msg, client);
			case 'emoji': return new this.emoji(msg, client);
			case 'role': return new this.role(msg, client);
			case 'server': return new this.server(msg, client);
			case 'stats': return new this.stats(msg, client);
			case 'user': return new this.user(msg, client);
		}
	}
}
module.exports = Info;
