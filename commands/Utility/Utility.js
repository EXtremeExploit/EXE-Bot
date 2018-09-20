const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
class Utility {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.image = require('./image');
		this.math = require('./math');
		this.shorturl = require('./shorturl');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'image': return new this.image(msg, client);
			case 'math': return new this.math(msg, client);
			case 'shorturl': return new this.shorturl(msg, client);
		}
	}
}
module.exports = Utility;
