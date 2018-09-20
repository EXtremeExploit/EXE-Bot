const mathjs = require('mathjs');

const discord = require('discord.js');
const { Message, Client } = discord;
class math {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (args) {
			try {
				msg.channel.send(new discord.RichEmbed()
					.setColor([8, 145, 1])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.setTitle('Math')
					.setDescription(args + ' = ' + mathjs.eval(args)));
			} catch (e) {
				msg.channel.send(new discord.RichEmbed()
					.setDescription(e.message)
					.setColor([255, 0, 0])
					.setTitle('An Error Ocurred!'));
			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setDescription('Enter an expression to evaluate')
				.setAuthor(msg.author.username, msg.author.displayAvatarURL));
		}
	}
}
module.exports = math;
