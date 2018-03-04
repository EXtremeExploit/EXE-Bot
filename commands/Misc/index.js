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

		switch (command) {
			case 'ping': return new this.ping(msg, client);
			case 'pong': return new this.pong(msg, client);
			case 'uptime': return new this.uptime(msg, client);
			case 'wiki': return new this.wiki(msg, client);
		}
	}
}
module.exports = Misc;
