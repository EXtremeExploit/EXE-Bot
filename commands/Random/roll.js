const discord = require('discord.js');
const { Message, Client } = discord;
class roll {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		const roll = Math.floor(Math.random() * 100) + 1;
		msg.channel.send(new discord.RichEmbed()
			.setColor([255, 0, 0])
			.setTitle('Roll')
			.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
			.setDescription('You Rolled a: **' + roll + '**'));
	}
}
module.exports = roll;
