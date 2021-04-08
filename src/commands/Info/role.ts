import discord from 'discord.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.mentions.roles.first()) {
			let role = msg.mentions.roles.first();

			msg.channel.send(new discord.MessageEmbed()
				.setColor([0, 0, 255])
				.addField(`Name`, role.name)
				.addField(`ID`, role.id)
				.addField(`Hex Color`, role.hexColor)
				.addField(`Position`, role.position + 1)
				.addField(`Mentionable`, role.mentionable)
				.addField(`Managed by a Bot`, role.managed)
				.addField(`Display separately from online members`, role.hoist)
				.addField(`Member Count`, role.members.size));
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check \`${prefix}help role\``)
				.setDescription(`Please specify a role!`));
		}
	}
}