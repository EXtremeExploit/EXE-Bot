import discord from 'discord.js';
import { getUser } from '../../util.js'

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let user = getUser(client, msg);

		msg.channel.send(new discord.MessageEmbed()
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setColor([255, 0, 0])
			.setURL(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setTitle(`URL`)
			.setDescription(`${user.username}'s Avatar`));
	}
}