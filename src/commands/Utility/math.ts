import discord from 'discord.js';
import math from 'mathjs';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(' ');
		let args = messageArray.slice(1).join(' ');

		if (args) {
			try {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([8, 145, 1])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
					.setTitle('Math')
					.setDescription(args + ' = ' + math.evaluate(args)));
			} catch (e) {
				msg.channel.send(new discord.MessageEmbed()
					.setDescription(e.message)
					.setColor([255, 0, 0])
					.setTitle('An Error Ocurred!'));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setDescription('Enter an expression to evaluate')
				.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
		}
	}
}