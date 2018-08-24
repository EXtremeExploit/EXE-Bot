const discord = require('discord.js');
const { Message, Client } = discord;
class dice {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		const dice = Math.floor(Math.random() * 6) + 1;
		msg.channel.send(new discord.RichEmbed()
			.setColor([255, 0, 0])
			.setTitle('Dice')
			.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
			.setDescription('You took a **' + dice + '**'));
	}
}
module.exports = dice;
