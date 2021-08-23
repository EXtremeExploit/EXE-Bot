import discord from 'discord.js';
import config from '../../config.js';
import util from 'util';
const ownerId = new config().getOwnerId();

import { createRequire } from 'module';
import * as path from 'path';
import { URL } from 'url';
const __dirname = path.resolve();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const require = createRequire(new URL('file://' + __dirname + '/out/src/commands/BotOwner/eval.js'));

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
				content: 'how did you find this command?',
				ephemeral: true
			});
			return false;
		}

		try {
			let evaled = await eval(code);
			evaled = util.inspect(evaled);

			if ((evaled as string).length >= 1023)
				evaled = 'Output is longer or equal to 1023';

			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle('Eval Command')
					.addField('Input', `\`\`\`\n${code}\n\`\`\``)
					.addField('Output:', `\`\`\`js\n${evaled}\`\`\``)]
			});
			return true;
		} catch (err) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setTitle('ERROR')
					.setColor([255, 0, 0])
					.setDescription(`\`\`\`\n${err}\`\`\``)]
			});
			return false;
		}
	}
}
