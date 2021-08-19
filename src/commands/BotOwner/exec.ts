import { exec } from 'child_process';
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
		const code = this.int.options.getString('code');

		if (this.int.user.id !== ownerId) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Bot owner only!')
					.setFooter('how did you find this command?')]
			});
			return false;
		}

		exec(code, async (error, stdout, stderr) => {
			if (error) {
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Error', `\`\`\`${error}\`\`\``)]
				});
				console.log(`error: ${error.message}`);
			}

			if (stderr) {
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Error', `\`\`\`${stderr}\`\`\``)]
				});
				console.log(`stderr: ${stderr}`);
			}

			if (stdout) {
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Out', `\`\`\`${stdout}\`\`\``)]
				});
				console.log(stdout);
			}
		});
		return true;
	}
}
