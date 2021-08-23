import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		let user = this.int.options.getUser('user') as discord.User;

		if (!user) user = this.int.user;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setImage(user.displayAvatarURL({ size: 1024 }))
				.setColor([255, 0, 0])
				.setURL(user.displayAvatarURL({ size: 1024 }))
				.setTitle('URL')
				.setDescription(`${user.username}'s Avatar`)]
		});
		return true;
	}
}
