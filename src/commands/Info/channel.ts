import discord from 'discord.js';
import { convertDate } from '../../util.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let channel = (msg.mentions.channels.first()) ?
			(msg.guild.channels.resolve(msg.mentions.channels.first().id))
			: (msg.guild.channels.resolve(msg.content.split(` `).slice(1).join(` `))) ?
				(msg.guild.channels.resolve(msg.content.split(` `).slice(1).join(` `)))
				: msg.guild.channels.resolve(msg.channel.id);

		msg.channel.send(new discord.MessageEmbed()
			.setColor([0, 0, 255])
			.setTitle(channel.name)
			.addField(`Name`, channel.name)
			.addField(`ID`, channel.id)
			.addField(`Type`, channel.type)
			.addField(`Created At`, convertDate(channel.createdAt, channel.createdTimestamp)));
	}
}