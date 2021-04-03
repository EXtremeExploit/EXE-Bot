import { Client, Message } from "discord.js";
import discord from 'discord.js';

export default class {
	constructor(client: Client, msg: Message) {
		client.generateInvite({
			permissions: [
				'SEND_MESSAGES',
				'READ_MESSAGE_HISTORY',
				'KICK_MEMBERS',
				'BAN_MEMBERS',
				'MANAGE_MESSAGES',
				'MANAGE_ROLES',
				'MANAGE_CHANNELS',
				'EMBED_LINKS'
			]
		}).then((link) => {
			msg.channel.send(new discord.MessageEmbed()
				.setTitle('Invite me to your server!')
				.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setColor([255, 0, 0])
				.setDescription(link)
				.setURL(link));
		});
	}
}