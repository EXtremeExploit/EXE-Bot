import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {

		this.client = client;
		this.int = int;
	}

	async init() {
		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle('Pinging...')
				.setColor([0, 0, 255])]
		});

		await this.int.editReply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Pong!')
				.setTimestamp(new Date())
				.addField('Bot', `**${Date.now() - this.int.createdTimestamp}ms.**`, true)
				.addField('WebSocket', `**${this.client.ws.ping}ms.**`, true)]
		});
		return true;
	}
}
