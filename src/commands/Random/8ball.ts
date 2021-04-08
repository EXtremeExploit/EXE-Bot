import discord from 'discord.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(` `);
		let args = messageArray.slice(1).join(` `);

		let response = [
			`Nope`,
			`Yes`,
			`Of Course`,
			`Never`,
			`Not looking so good...`,
			`Concentrate and ask again`,
			`Yes, definitely`,
			`Better not tell you now`
		];
		if (args == ``) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([0, 0, 0])
				.addField(`Help`, `Check \`${prefix}help 8ball\``)
				.setDescription(`Please specify an ask!`));
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([0, 0, 0])
				.setTitle(`8ball`)
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setDescription(response[Math.floor(Math.random() * response.length)]));
		}
	}
}