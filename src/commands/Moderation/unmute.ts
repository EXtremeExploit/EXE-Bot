import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.member.hasPermission(`MANAGE_ROLES`) || msg.member.hasPermission(`ADMINISTRATOR`)) {
			if (msg.mentions.members.first()) {
				if (msg.member.user.id == msg.mentions.members.first().id) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setDescription(`Why do you want to unmute yourself...?`)
						.setTitle(`Are you serious?`));
				} else {
					(msg.channel as discord.GuildChannel).updateOverwrite(msg.mentions.members.first(), {
						SEND_MESSAGES: true
					}).then((channel) => {
						if ((msg.channel as discord.GuildChannel).permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
							msg.channel.send(new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle(`Unmuted`)
								.setDescription(`Succesfully unmuted: ${msg.mentions.members.first().user.username}`));
						} else return;
					});
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
	}
}