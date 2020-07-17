import discord from 'discord.js';
import config from '../../config.js';
import { commandsArray, Categories } from '../../commands.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let args = msg.content.split(` `).splice(1);

		let _cat: string;
		let str = ``;
		let categories = Object.keys(Categories).splice(1).filter((e) => e != 'BotOwner').splice(8);

		for (_cat in categories) {
			if (categories.hasOwnProperty(_cat)) {
				const cat = categories[_cat];

				if (args[0] !== undefined && args[0].toLowerCase() == cat.toLowerCase()) {
					let commands = commandsArray.filter((e) => e.category == Categories[cat]);

					for (const c of commands) {
						str += `\`${c.name}\`\n`
					}
					msg.channel.send(new discord.MessageEmbed()
						.setColor(0xFF0000)
						.addField(cat, str)
						.setTitle(`Help`))
					return;
				}
			}
		}
		if (str == '') {
			for (let i = 0; i < categories.length; i++) {
				const cat = categories[i];
				str += `${cat}\n`;
			}
			
			msg.channel.send(new discord.MessageEmbed()
				.setColor(0xFF0000)
				.setTitle(`Help`)
				.addField(`Categories`, str)
				.addField(`Wikis`,
					`**Home:** ${wikis.home}\n` +
					`**Commands:** ${wikis.commands}\n` +
					`**Replies:** ${wikis.replies}\n` +
					`**FAQ:** ${wikis.faq}`));
		}
	}
}
