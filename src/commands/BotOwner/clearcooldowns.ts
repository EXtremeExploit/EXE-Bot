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
				content: 'how did you find this command?',
				ephemeral: true
			});
			return false;
		}

		await CooldownModel.collection.deleteMany({});
		await this.int.reply({
			content: 'Cooldowns cleared',
			ephemeral: true
		});
		return true;
	}
}
