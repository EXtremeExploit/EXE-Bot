const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
class NSFW {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.danbooru = require('./danbooru');
		this.rule34 = require('./rule34');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'danbooru': return new this.danbooru(msg, client);
			case 'rule34':
			case 'r34':
				return new this.rule34(msg, client);
		}
	}
}
module.exports = NSFW;
