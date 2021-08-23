import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const text = this.int.options.getString('text');

		if (text.includes('@everyone') || text.includes('@here')) {
			await this.int.reply({
				content: 'You cannot mention @everyone or @here',
				ephemeral: true
			});
			return false;
		}

		await this.int.reply({ content: text });
		return true;

	}
}
