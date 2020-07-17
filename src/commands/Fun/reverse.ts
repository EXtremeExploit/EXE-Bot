import discord from 'discord.js';
import { reverseString } from '../../util.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let args = msg.content.split(` `).slice(1).join(` `);

		if (args !== `` || args == null) {
			let reversedText = reverseString(args);
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setDescription(reversedText)
				.setTitle(`Reverse`));
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check the [wiki](${wikis.commands}#fun) for help!`)
				.setDescription(`Please specify something to reverse!`));
		}
	}
}