const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};

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
		this.lenny = require('./lenny');
		this.pat = require('./pat');
		this.reverse = require('./reverse');
		this.sandwich = require('./sandwich');
		this.say = require('./say');
		this.waifu = require('./waifu');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var args = messageArray.slice(1).join(' ');
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'cookie':
				new this.cookie(msg, client);
				break;
			case 'lenny':
				new this.lenny(msg, client);
				break;
			case 'pat':
				new this.pat(msg, client);
				break;
			case 'reverse':
				new this.reverse(msg, client);
				break;
			case 'sandwich':
				new this.sandwich(msg, client);
				break;
			case 'say':
				new this.say(msg, client);
				break;
			case 'waifu':
				new this.waifu(msg, client);
				break;
		}
	}
}
module.exports = Fun;
