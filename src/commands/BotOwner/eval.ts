import discord from 'discord.js';
import config from '../../config.js';
import util from 'util'
let owner = new config().GetOwner();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let args = msg.content.split(` `).slice(1).join(` `);

		if (msg.member.user.id == owner.id) {
			try {
				let evaled = eval(args);
				evaled = util.inspect(evaled);

				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Eval Command`)
					.addField(`Input`, `\`\`\`\n${args}\n\`\`\``)
					.addField(`Output:`, `\`\`\`js\n${evaled}\`\`\``));
			} catch (err) {
				msg.channel.send(new discord.MessageEmbed()
					.setTitle(`ERROR`)
					.setColor([255, 0, 0])
					.setDescription(`\`\`\`js\n${err}\`\`\``));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setDescription(`Bot owner only!`)
				.setFooter(`how did you found this command?`)
			);
		}
	}
}