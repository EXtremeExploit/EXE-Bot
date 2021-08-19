import discord from 'discord.js';
import { evaluate } from 'mathjs';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const expression = this.int.options.getString('query');

		if (expression == '') {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setDescription('Enter an expression to evaluate')
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))]
			});
			return false;
		}

		try {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([8, 145, 1])
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setTitle('Math')
					.setDescription(expression + ' = ' + evaluate(expression))]
			});
			return true;
		} catch (e) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setDescription(e.message)
					.setColor([255, 0, 0])
					.setTitle('An Error Ocurred!')]
			});
			return false;
		}
	}
}
