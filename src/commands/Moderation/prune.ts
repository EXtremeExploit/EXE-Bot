import discord from 'discord.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(` `);
		let args = messageArray.slice(1).join(` `);

		if (msg.member.hasPermission([`MANAGE_MESSAGES`]) || msg.member.hasPermission([`ADMINISTRATOR`])) {
			if (!args == null || args !== ``) {
				let deln = parseInt(args);
				if (isNaN(deln)) deln = 1;
				if (deln < 2 || deln > 99) {
					msg.channel.send(new discord.MessageEmbed()
						.addField(`Help`, `Check \`${prefix}help prune\``)
						.setDescription(`Please specify a number between 2 and 99!`)
						.setColor([255, 0, 0]));
				} else {
					(msg.channel as discord.TextChannel).bulkDelete(deln + 1).then((e) => { })
				}
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.addField(`Help`, `Check \`${prefix}help prune\``)
					.setDescription(`Please specify a number!`));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setTitle(`ERROR`)
				.setDescription(`You dont have permissions to run that command.`)
				.setColor([255, 0, 0]));
		}
	}
}