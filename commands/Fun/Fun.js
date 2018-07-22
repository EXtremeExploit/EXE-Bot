const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
class Fun {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.cookie = require('./cookie');
		this.dicksize = require('./dicksize');
		this.jokes = require('./jokes');
		this.lenny = require('./lenny');
		this.pat = require('./pat');
		this.reverse = require('./reverse');
		this.rps = require('./rps');
		this.sandwich = require('./sandwich');
		this.say = require('./say');
		this.touch = require('./touch');
		this.waifu = require('./waifu');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'cookie': return new this.cookie(msg, client);
			case 'dicksize': return new this.dicksize(msg, client);
			case 'jokes': return new this.jokes(msg, client);
			case 'lenny': return new this.lenny(msg, client);
			case 'pat': return new this.pat(msg, client);
			case 'reverse': return new this.reverse(msg, client);
			case 'rps': return new this.rps(msg, client);
			case 'sandwich': return new this.sandwich(msg, client);
			case 'say': return new this.say(msg, client);
			case 'touch': return new this.touch(msg, client);
			case 'waifu': return new this.waifu(msg, client);
		}
	}
}
module.exports = Fun;
