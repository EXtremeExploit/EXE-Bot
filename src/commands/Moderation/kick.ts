import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		if (!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS) &&
			!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) {
			this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setTitle('ERROR')
					.setDescription('You dont have permissions to run that command.')
					.setColor([255, 0, 0])]
			});
			return false;
		}

		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (this.int.user.id == user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Why do you want to kick yourself...?')
					.setTitle('Are you serious?')]
			});
			return false;
		}

		if (user.id == this.client.user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('WHY ME!!!???')
					.setTitle(';-;')]
			});
			return false;
		}

		const memberCanKick = (this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS);
		const isLowerRole = (this.int.member as discord.GuildMember).roles.highest.comparePositionTo(user.roles.highest) > 0;

		if (!memberCanKick || !isLowerRole || user.id == this.int.guild.ownerId) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle('Kick Error')
					.setDescription('You don\'t have permissions to kick that member')]
			});
			return false;
		}

		const iCanKick = this.int.guild.me.permissions.has(discord.Permissions.FLAGS.KICK_MEMBERS);

		if (!iCanKick || !user.kickable) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle('Kick Error')
					.setDescription('I don\'t have permissions to do that')]
			});
			return false;
		}

		await user.kick();
		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Kicked')
				.setDescription(`Succesfully kicked: ${user.user.tag}`)]
		});
		return true;
	}
}
