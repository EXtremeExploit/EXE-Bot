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
		this.dicksize = require('./dicksize');
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
			case 'cookie': return new this.cookie(msg, client);
			case 'dicksize': return new this.dicksize(msg, client);
			case 'lenny': return new this.lenny(msg, client);
			case 'pat': return new this.pat(msg, client);
			case 'reverse': return new this.reverse(msg, client);
			case 'sandwich': return new this.sandwich(msg, client);
			case 'say': return new this.say(msg, client);
			case 'waifu': return new this.waifu(msg, client);
		}
	}
}
module.exports = Fun;
