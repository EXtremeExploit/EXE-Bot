import discord, { Permissions } from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const link = this.client.generateInvite({
			permissions: [
				Permissions.FLAGS.SEND_MESSAGES,
				Permissions.FLAGS.READ_MESSAGE_HISTORY,
				Permissions.FLAGS.KICK_MEMBERS,
				Permissions.FLAGS.BAN_MEMBERS,
				Permissions.FLAGS.MANAGE_MESSAGES,
				Permissions.FLAGS.MANAGE_ROLES,
				Permissions.FLAGS.MANAGE_CHANNELS,
				Permissions.FLAGS.EMBED_LINKS
			],
			scopes: ['bot', 'applications.commands'],
		});

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle('Invite me to your server!')
				.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size: 1024 }))
				.setColor([255, 0, 0])
				.setDescription(link)
				.setURL(link)]
		});
		return true;
	}
}
