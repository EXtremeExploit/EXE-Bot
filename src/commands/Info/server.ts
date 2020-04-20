import discord from 'discord.js';
import { convertDate } from '../../util.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.guild.available) {
			let verificationLevel: string;
			switch (msg.guild.verificationLevel) {
				case `NONE`: verificationLevel = `None`; break;
				case `LOW`: verificationLevel = `Low: Must have a verified e-mail on their Discord account`; break;
				case `MEDIUM`: verificationLevel = `Medium: Must have a verified e-mail and be registreder for longer than 5 minutes`; break;
				case `HIGH`: verificationLevel = `(╯°□°）╯︵ ┻━┻: Must be in the server for longer than 10 minutes`; break;
				case `VERY_HIGH`: verificationLevel = `┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻: Must have a phone on their discord account`; break;

			}
			let afkchannelname;
			let afkTimeout;
			if (msg.guild.afkChannel == null || msg.guild.afkChannelID == null) {
				afkchannelname = `*null*`;
				msg.guild.afkChannelID = `*null*`;
				afkTimeout = `*null*`;
			} else {
				afkchannelname = msg.guild.afkChannel.name;
				afkTimeout = msg.guild.afkTimeout;
			}


			msg.channel.send(new discord.MessageEmbed()
				.setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, size: 1024, format: `png` }))
				.setColor([0, 0, 255])
				.setThumbnail(msg.guild.iconURL({ dynamic: true, size: 1024, format: `png` }))
				.addField(`ID`, msg.guild.id, true)
				.addField(`Region`, msg.guild.region, true)
				.addField(`AFK`,
					`**Channel** ${afkchannelname}\n` +
					`**ChannelID:** ${msg.guild.afkChannelID}\n` +
					`**Timeout(seconds):** ${afkTimeout}`, true)
				.addField(`Counts`,
					`**Members:** ${msg.guild.memberCount}\n` +
					`**Roles:** ${msg.guild.roles.cache.size}\n` +
					`**Channels:** ${msg.guild.channels.cache.size}`, true)
				.addField(`Owner`,
					`**Owner:** ${msg.guild.owner}\n` +
					`**OwnerID:** ${msg.guild.ownerID}`, true)
				.addField(`Dates`, `Creation: ${convertDate(msg.guild.createdAt, msg.guild.createdTimestamp)}`)
				.addField(`Verification Level`, verificationLevel, true)
				.addField(`Icon`,
					`**Icon Hash:** ${msg.guild.icon}\n` +
					`**Icon URL:** ${msg.guild.iconURL({ dynamic: true, size: 1024, format: `png` })}`, true));
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setDescription(`Server not available`));
		}
	}
}