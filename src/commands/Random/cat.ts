import discord from 'discord.js';
import _randomCat from 'random.cat.js';
const randomCat = _randomCat.api();

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const cat = await randomCat.getCat();

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setImage(cat.file)
				.setColor([255, 0, 0])
				.setTitle('Random Cat')
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))]
		});
	}
}
