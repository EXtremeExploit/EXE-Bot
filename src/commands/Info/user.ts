import discord from 'discord.js';
import { convertDate } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		let user = this.int.options.getMember('user') as discord.GuildMember;
		if (!user) user = this.int.member as discord.GuildMember;
		let status: string;

		switch (user.presence.status) {
			case 'online': status = 'Online'; break;
			case 'dnd': status = 'Do Not Disturb'; break;
			case 'idle': status = 'AFK'; break;
			case 'invisible':
			case 'offline': status = 'Offline'; break;
		}
		let isWeb, isDesktop, isMobile = false;
		if (user.presence.clientStatus) {
			if (user.presence.clientStatus.web) isWeb = true;
			if (user.presence.clientStatus.desktop) isDesktop = true;
			if (user.presence.clientStatus.mobile) isMobile = false;
		}

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setDescription(`${user.user.username} info`)
				.setColor([255, 0, 0])
				.addField('Full Username', user.user.tag, true)
				.addField('ID', user.id, true)
				.addField('Roles',
					`**Hoist:** ${user.roles.hoist}\n` +
					`**Highest:** ${user.roles.highest}\n` +
					`**Color:** ${user.roles.color}`, true)
				.addField('Presence',
					`**Web:** ${isWeb}\n` +
					`**Desktop:** ${isDesktop}\n` +
					`**Mobile:** ${isMobile}\n` +
					`**Status:** ${status}\n`, true)
				.addField('Dates',
					`**Created:** ${convertDate(user.user.createdAt, user.user.createdTimestamp)}\n` +
					`**Joined:** ${convertDate(user.joinedAt, user.joinedTimestamp)}`, true)
				.addField('Bot', user.user.bot ? 'Yes' : 'No', true)
				.addField('Avatar',
					`**displayAvatarURL:** ${user.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' })}`, true)
				.setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
				.setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))]
		});
		return true;
	}
}
