import { Client, Message } from "discord.js";
import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: Client, msg: Message) {
		msg.channel.send(new discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
			.addField(`Wikis`,
				`**Home:** ${wikis.home}\n` +
				`**Commands:** ${wikis.commands}\n` +
				`**Replies:** ${wikis.replies}\n` +
				`**FAQ:** ${wikis.faq}`)
			.setFooter(`Wikis hosted by Github`));

	}
}
