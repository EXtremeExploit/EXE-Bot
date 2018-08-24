const discord = require('discord.js');
const { Message, Client } = discord;
class coinflip {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var randonmes = Math.random().toFixed(2) * 100;
		if (randonmes < 50) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL)
				.setTitle('Coin flip!')
				.setDescription('I flipped a coin and it landed on **heads**.'));
		} else if (randonmes > 50) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL)
				.setTitle('Coin flip!')
				.setDescription('I flipped a coin and it landed on **tails**.'));
		} else if (randonmes == 50) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL)
				.setTitle('Coin flip!')
				.setDescription('I flipped a coin and it landed on.... THE EDGE!!!'));
		}
	}
}
module.exports = coinflip;
