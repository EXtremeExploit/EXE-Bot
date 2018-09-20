const discord = require('discord.js');
const { Message, Client } = discord;
class waifu {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		msg.reply('Your waifu doesn\'t exists, sorry about that...');
	}
}
module.exports = waifu;
