const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();
class Moderation {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.ban = require('./ban');
		this.kick = require('./kick');
		this.mute = require('./mute');
		this.prune = require('./prune');
		this.unmute = require('./unmute');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'ban': return new this.ban(msg, client);
			case 'kick': return new this.kick(msg, client);
			case 'mute': return new this.mute(msg, client);
			case 'prune': return new this.prune(msg, client);
			case 'unmute': return new this.unmute(msg, client);
		}
	}
}
module.exports = Moderation;
