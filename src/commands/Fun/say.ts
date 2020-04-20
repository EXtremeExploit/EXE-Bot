import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(` `);
		let args = messageArray.slice(1).join(` `);

		if (args !== `` || args == null) {
			if (msg.content.includes(`@everyone`) || msg.content.includes(`@here`)) {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
					.setTitle(`Say`)
					.setDescription(`You cannot mention @everyone or @here`));
			} else {
				msg.channel.send(args);
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check the [wiki](${wikis.commands}#fun) for help!`)
				.setDescription(`Please specify something to say!`));
		}
	}
}