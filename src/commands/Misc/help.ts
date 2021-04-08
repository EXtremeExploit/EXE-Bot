import discord from 'discord.js';
import config from '../../config.js';
import { commandsArray, Categories } from '../../commands.js';
let wikis = new config().GetWikis();
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let args = msg.content.split(` `).splice(1);

		let _cat: string;
		let sendDefault = true;
		let numberOfCommands = Object.keys(Categories).length / 2;
		let categories = Object.keys(Categories).splice(1).filter((e) => e != 'BotOwner').splice(numberOfCommands - 1);

		if (args[0]) {
			for (_cat in categories) {//Send list of commands for a category
				if (categories.hasOwnProperty(_cat)) {
					const cat = categories[_cat];

					if (args[0] !== undefined && args[0].toLowerCase() == cat.toLowerCase()) {
						let commands = commandsArray.filter((e) => e.category == Categories[cat]);

						let str = '';
						for (const c of commands) {
							str += `\`${c.name}\`\n`
						}
						msg.channel.send(new discord.MessageEmbed()
							.setColor(0xFF0000)
							.addField(cat, str)
							.setTitle(`Help`))
						return;
					}
				}
			}

			for (let i = 0; i < commandsArray.length; i++) {//Send documentation of a command
				let cmd = commandsArray[i];
				if (args[0] !== undefined && args[0].toLowerCase() == cmd.name || cmd.aliases.includes(args[0].toLowerCase())) {
					let aliases = 'None';
					if (cmd.aliases.length > 0) aliases = cmd.aliases.join(', ')
					msg.channel.send(new discord.MessageEmbed()
						.setColor(0xFF0000)
						.setTitle(`${cmd.name} Documentation`)
						.addField('Aliases', aliases)
						.addField('Description', cmd.docs.desc)
						.addField('Arguments', `\`${cmd.docs.args}\``)
						.addField('Example/Usage', `\`${cmd.docs.ex}\``))
					return;
				}
			}
		}
		//Send list of categories by default
		let str = '';
		for (let i = 0; i < categories.length; i++) {
			const cat = categories[i];
			str += `${cat}\n`;
		}

		msg.channel.send(new discord.MessageEmbed()
			.setColor(0xFF0000)
			.setDescription('**Usage:** `' + prefix + 'help [Category/Command]`')
			.setTitle(`Help`)
			.addField(`Categories`, str)
			.addField(`Wikis`,
				`**Home:** ${wikis.home}\n` +
				`**Replies:** ${wikis.replies}\n` +
				`**FAQ:** ${wikis.faq}`));
	}
}
