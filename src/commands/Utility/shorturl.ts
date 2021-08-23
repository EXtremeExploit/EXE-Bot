import discord from 'discord.js';
import isgd from 'isgd';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const url = this.int.options.getString('url');

		// https://is.gd/exe_bot

		const res = await isgd.shorten(url);
		if (res.startsWith('Error:')) {
			await this.int.reply({
				content: 'Please specify a valid URL to short!',
				ephemeral: true
			});
			return false;
		}
		await this.int.reply(res);
		return true;
	}
}
