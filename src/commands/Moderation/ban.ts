import discord from 'discord.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.member.hasPermission([`BAN_MEMBERS`]) || msg.member.hasPermission([`ADMINISTRATOR`])) {
			if (msg.mentions.members.first()) {
				if (msg.member.user.id == msg.mentions.members.first().id) {
					if (!msg.content.includes('--force'))
						msg.channel.send(new discord.MessageEmbed()
							.setColor([255, 0, 0])
							.setDescription(`Why do you want to ban yourself...?`)
							.setTitle(`Are you serious?`));
					else {
						if (msg.member.hasPermission(discord.Permissions.FLAGS.BAN_MEMBERS) && (msg.member.roles.highest.comparePositionTo(msg.mentions.members.first().roles.highest) > 0)) {
							msg.mentions.members.first().ban().then((member) => {
								msg.channel.send(new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setTitle(`Banned`)
									.setDescription(`Succesfully banned: ${member.user.tag}`));
							});
						} else {
							msg.channel.send(new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle(`Ban Error`)
								.setDescription(`I don't have permissions to do that or you can't ban that member`));
						}
					}
				} else {
					if (msg.mentions.members.first().id == client.user.id) {
						msg.channel.send(new discord.MessageEmbed()
							.setColor([255, 0, 0])
							.setDescription(`WHY ME!!!???`)
							.setTitle(`;-;`));
					} else {
						if (msg.member.hasPermission(discord.Permissions.FLAGS.BAN_MEMBERS) && (msg.member.roles.highest.comparePositionTo(msg.mentions.members.first().roles.highest) > 0)) {
							msg.mentions.members.first().ban().then((member) => {
								msg.channel.send(new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setTitle(`Banned`)
									.setDescription(`Succesfully banned: ${member.user.tag}`));
							});
						} else {
							msg.channel.send(new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle(`Ban Error`)
								.setDescription(`I don't have permissions to do that or you can't ban that member`));
						}
					}
				}
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.addField(`Help`, `Check \`${prefix}help ban\``)
					.setDescription(`Please specify an user!`));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setTitle(`ERROR`)
				.setDescription(`You dont have permissions to run that command.`)
				.setColor([255, 0, 0]));
		}
	}
}