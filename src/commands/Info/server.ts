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
		if (!this.int.guild.available) {
			this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Server not available')]
			});
			return false;
		}

		let verificationLevel: string;
		switch (this.int.guild.verificationLevel) {
			case 'NONE': verificationLevel = 'None'; break;
			case 'LOW': verificationLevel = 'Verified e-mail'; break;
			case 'MEDIUM': verificationLevel = 'Verified e-mail & registered for 5 minutes'; break;
			case 'HIGH': verificationLevel = 'In the server for longer than 10 minutes'; break;
			case 'VERY_HIGH': verificationLevel = 'Phone linked'; break;

		}
		let afkchannelname;
		let afkTimeout;
		if (this.int.guild.afkChannel == null || this.int.guild.afkChannelId == null) {
			afkchannelname = '*null*';
			this.int.guild.afkChannelId = '*null*';
			afkTimeout = '*null*';
		} else {
			afkchannelname = this.int.guild.afkChannel.name;
			afkTimeout = this.int.guild.afkTimeout;
		}

		const botCount = (await this.int.guild.members.fetch()).filter((e) => e.user.bot == true).size;

		const embed = new discord.MessageEmbed()
			.setAuthor(this.int.guild.name, this.int.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
			.setColor([0, 0, 255])
			.setThumbnail(this.int.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
			.addField('ID', this.int.guild.id, true)
			.addField('AFK',
				`**Channel;ID** ${afkchannelname};${this.int.guild.afkChannelId}\n` +
				`**Timeout(seconds):** ${afkTimeout}`, true)
			.addField('Counts',
				`**Members:** ${this.int.guild.memberCount}\n` +
				`**Bots:** ${botCount}` +
				`**Roles:** ${this.int.guild.roles.cache.size}\n` +
				`**Channels:** ${this.int.guild.channels.cache.size}`, true)
			.addField('Owner',
				`**Owner;ID:** <@${this.int.guild.ownerId}>;${this.int.guild.ownerId}\n`, true)
			.addField('Creation Date',
				convertDate(this.int.guild.createdAt, this.int.guild.createdTimestamp))
			.addField('Verification Level', verificationLevel, true)
			.addField('NSFW Level', this.int.guild.nsfwLevel, true)
			.addField('Icon',
				`**Icon URL:** ${this.int.guild.iconURL({ dynamic: true, size: 1024, format: 'png' })}`, true);

		if (this.int.guild.bannerURL())
			embed.setImage(this.int.guild.bannerURL({ format: 'png', size: 4096 }));

		await this.int.reply({ embeds: [embed] });
		return true;
	}
}
