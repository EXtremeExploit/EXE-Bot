import { exec } from 'child_process';
import discord from 'discord.js';
import config from '../../config.js';
let owner = new config().GetOwner();

export default class {
	client: discord.Client;
	msg: discord.Message;
	constructor(client: discord.Client, msg: discord.Message) {
		this.client = client;
		this.msg = msg;
	}

	async init() {
		let args = this.msg.content.split(` `).slice(1).join(` `);

		if (this.msg.member.user.id == owner.id) {
			exec(args, async (error, stdout, stderr) => {
				if (error) {
					await this.msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Error', `\`\`\`${error}\`\`\``));
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					await this.msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Error', `\`\`\`${stderr}\`\`\``));
					console.log(`stderr: ${stderr}`);
					return;
				}
				await this.msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.addField('Out', `\`\`\`${stdout}\`\`\``));
				console.log(stdout);
			});
		} else {
			await this.msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setDescription(`Bot owner only!`)
				.setFooter(`how did you find this command?`)
			);
		}
	}
}