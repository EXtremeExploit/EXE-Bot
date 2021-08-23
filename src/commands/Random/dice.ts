import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const dice = Math.floor(Math.random() * 6) + 1;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Dice')
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
				.setDescription(`The dice landed on: ${dice}`)]
		});
		return true;
	}
}
