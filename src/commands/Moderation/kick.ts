import discord from 'discord.js';
import config from '../../config.js';
import { getMember } from '../../util.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.member.hasPermission([`KICK_MEMBERS`]) || msg.member.hasPermission([`ADMINISTRATOR`])) {
			let user = getMember(client, msg, msg.guild, false);

			if (user.id != '0') {
				if (msg.member.user.id == user.id) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setDescription(`Why do you want to kick yourself...?`)
						.setTitle(`Are you serious?`));
					return;
				}

				if (user.id == client.user.id) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setDescription(`WHY ME!!!???`)
						.setTitle(`;-;`));
					return;
				}

				let memberCanKick = msg.member.hasPermission(discord.Permissions.FLAGS.KICK_MEMBERS);
				let isLowerRole = msg.member.roles.highest.comparePositionTo(user.roles.highest) > 0;
				let iCanKick = msg.guild.me.hasPermission(discord.Permissions.FLAGS.KICK_MEMBERS);

				if (!memberCanKick || !isLowerRole || user.id == msg.guild.ownerID) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle(`Kick Error`)
						.setDescription(`You don't have permissions to kick that member`));
						return;
				}

				if (!iCanKick || !user.kickable) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle(`Kick Error`)
						.setDescription(`I don't have permissions to do that`));
					return;
				}

				user.kick().then((member) => {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle(`Kicked`)
						.setDescription(`Succesfully kicked: ${member.user.tag}`));
				});
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.addField(`Help`, `Check \`${prefix}help kick\``)
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
