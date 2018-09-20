const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();
const discord = require('discord.js');
const { Message, Client } = discord;
class Support {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.info = require('./info');
		this.invite = require('./invite');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'info': return new this.info(msg, client);
			case 'invite': return new this.invite(msg, client);
		}
	}
}
module.exports = Support;
