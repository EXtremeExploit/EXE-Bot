import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if ((msg.channel as discord.GuildChannel).permissionsFor(msg.guild.me).has(`MANAGE_ROLES`) == true) {
			if (msg.member.hasPermission(`MANAGE_ROLES`) || msg.member.hasPermission(`ADMINISTRATOR`)) {
				if (msg.mentions.members.first()) {
					if (msg.member.user.id == msg.mentions.members.first().id) {
						msg.channel.send(new discord.MessageEmbed()
							.setColor([255, 0, 0])
							.setDescription(`Why do you want to mute yourself...?`)
							.setTitle(`Are you serious?`));
					} else {
						if ((msg.mentions.members.first().id == client.user.id) && (!msg.content.includes(`--force`))) {
							msg.channel.send(new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle(`If you mute me, im not gonna work on this channel, are you sure?`)
								.setDescription(`You 'll need to unmute me manually whenever you want to use me :3`)
								.addField(`Yes`, `\`${prefix}mute <@Member> --force\``)
								.addField(`No`, `Ignore this`));
						} else {
							(msg.channel as discord.GuildChannel).updateOverwrite(msg.mentions.members.first(), {
								SEND_MESSAGES: false
							}).then((channel) => {
								if ((msg.channel as discord.GuildChannel).permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
									msg.channel.send(new discord.MessageEmbed()
										.setColor([255, 0, 0])
										.setTitle(`Muted`)
										.setDescription(`Succesfully muted: ${msg.mentions.members.first().user.username}`));
								} else return;
							});
						}
					}
				} else {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField(`Help`, `Check the [wiki](${wikis.commands}#moderation) for help!`)
						.setDescription(`Please specify an user!`));

				}
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
					.setTitle(`ERROR`)
					.setDescription(`You dont have permissions to run that command.`)
					.setColor([255, 0, 0]));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setDescription(`**To do that i need any of the following permissions**\n` +
					` - Manage permissions on this channel\n` +
					` - Manage roles`));
		}
	}
}