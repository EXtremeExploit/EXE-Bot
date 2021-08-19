import discord from 'discord.js';
import config from '../../config.js';
import { CooldownModel } from '../../util.js';
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
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Bot owner only!')
					.setFooter('how did you find this command?')]
			});
			return false;
		}

		await CooldownModel.collection.deleteMany({});
		await this.int.reply({ content: 'Cooldowns cleared', ephemeral: true });
		return true;
	}
}
