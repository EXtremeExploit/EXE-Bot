import discord from 'discord.js';
import { convertDate } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const channel = this.int.options.getChannel('channel') as discord.GuildChannel;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([0, 0, 255])
				.setTitle(channel.name)
				.addField('Name', channel.name)
				.addField('ID', channel.id)
				.addField('Type', channel.type)
				.addField('Created At', convertDate(channel.createdAt, channel.createdTimestamp))]
		});
		return true;
	}
}
