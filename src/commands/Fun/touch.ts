import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.author.id) {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription(`You touched yourself... OwO`)
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
			} else {
				if (msg.mentions.members.first().id == client.user.id) {
					msg.channel.send(new discord.MessageEmbed()
						.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setDescription(`Y-You touched MEE!!??, baka...`)
						.setColor([255, 0, 0]));
				} else {
					msg.reply(` touched <@${msg.mentions.members.first().id}>`).then(async (message) => {
						if (msg.mentions.members.first().user.bot) {
							msg.channel.send(`I can't touch bots...`);
						} else {
							msg.mentions.members.first().send(`${msg.author.tag} touched you ( ͡° ͜ʖ ͡°)`).catch(() => {
								return;
							});
						}
					});
				}
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setAuthor(msg.member.user.username)
				.setDescription(`You need to mention someone uwu`)
				.setColor([255, 0, 0]));
		}
	}
}