const { Message } = require('discord.js');
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
		var args = messageArray.slice(1).join(' ');
		var command = command_prefix.replace(prefix, '');
		 return;
		switch (command) {
			case 'ping':
				new this.ping(msg, client);
				break;
			case 'pong':
				new this.pong(msg, client);
				break;
			case 'uptime':
				new this.uptime(msg, client);
				break;
			case 'wiki':
				new this.wiki(msg, client);
				break;
		}
	}
}
module.exports = Misc;
