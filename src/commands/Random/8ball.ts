import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const question = this.int.options.getString('question');

		const response = [
			'Nope',
			'Yes',
			'Of Course',
			'Never',
			'Not looking so good...',
			'Concentrate and ask again',
			'Yes, definitely',
			'Better not tell you now'
		];
		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([0, 0, 0])
				.setTitle(question)
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
				.setDescription(response[Math.floor(Math.random() * response.length)])]
		});
	}
}
