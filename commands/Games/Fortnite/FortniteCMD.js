const main = require('../../commands').Main;
const data = main.getData();
var prefix = data.prefix();
class Fortnite {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.fortnite = require('./fortnite');
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'fortnite': return new this.fortnite(msg, client);
		}
	}
}
module.exports = Fortnite;
