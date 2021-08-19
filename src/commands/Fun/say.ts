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
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setTitle('Say')
					.setDescription('You cannot mention @everyone or @here')]
			});
			return false;
		}

		await this.int.reply({ content: text });
		return true;

	}
}
