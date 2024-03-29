import discord from 'discord.js';
import config from '../../config.js';
const ownerId = new config().getOwnerId();

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		if (this.int.user.id !== ownerId) {
			await this.int.reply({
				content: 'how did you find this command?',
				ephemeral: true
			});
			return false;
		}

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size: 1024 }))
				.setDescription('Disconnecting...')
				.setTitle('Disconnect')]
		});

		this.client.destroy();
		process.exit();

		return true;
	}
}
