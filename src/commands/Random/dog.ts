import discord from 'discord.js';
import _randomDog from 'random.dog.js';
const randomDog = _randomDog.api();

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const dog = await randomDog.getDog();

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setImage(dog.url)
				.setColor([255, 0, 0])
				.setTitle('Random Dog')
				.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))]
		});
		return true;
	}
}
