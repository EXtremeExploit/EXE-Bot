const discord = require('discord.js');
const { Message, Client } = discord;
class lenny {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		msg.channel.send('( ͡° ͜ʖ ͡°)');
	}
}
module.exports = lenny;
