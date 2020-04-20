import discord from 'discord.js';
import config from '../../config.js'
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let args = msg.content.split(` `).slice(1);
		let emojiname = args[0].split(`:`).length == 1 ? (args[0].split(`:`)[0]) : (args[0].split(`:`)[2]);
		if (args[0] == ``) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.addField(`Help`, `Check the [wiki](${wikis.commands}#info) for help!`)
				.setDescription(`Please specify an emoji to get!`));
		} else {
			let emote = msg.guild.emojis.cache.find((e) => e.name == emojiname);
			if (emote == null) {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Error`)
					.addField(`Help`, `Check the [wiki](${wikis.commands}#info) for help!`)
					.setDescription(`Please insert a valid emoji, it needs to be an emoji from THIS server`)
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setThumbnail(emote.url)
					.setImage(emote.url)
					.addField(`Emoji Info`,
						`**ID:** ${emote.id}\n` +
						`**Identifier:** ${emote.identifier}\n` +
						`**Animated:** ${emote.animated}\n` +
						`**Name:** ${emote.name}\n` +
						`**URL:** ${emote.url}`));
			}
		}
	}
}