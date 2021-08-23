import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const thing = this.int.options.getString('thing');

		const rate = Math.floor(Math.random() * 11);

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Rate')
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
				.setDescription(`I'd rate ${thing} a: ${rate} out of 10`)]
		});

		return true;
	}
}
