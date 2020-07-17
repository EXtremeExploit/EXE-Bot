import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(' ');
		let args = messageArray.slice(1).join(' ');

		const rate = Math.floor(Math.random() * 11);
		if (args !== '' || !args == null) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Rate')
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setDescription('I\'d rate ' + args + ' a: ' + rate));
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#random) for help!')
				.setDescription('Please specify something to rate!'));
		}
	}
}