import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const roll = Math.floor(Math.random() * 100) + 1;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Roll')
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
				.setDescription('You Rolled a: **' + roll + '**')]
		});
		return true;
	}
}
