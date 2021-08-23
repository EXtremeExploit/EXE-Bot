import discord from 'discord.js';
import config, { ram } from '../../config.js';
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

		ram.cfg.logcmd = !ram.cfg.logcmd;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor(0xFF0000)
				.setDescription(`CMD LOG: ${!ram.cfg.logcmd} => ${ram.cfg.logcmd}`)]
		});
		return true;
	}
}
