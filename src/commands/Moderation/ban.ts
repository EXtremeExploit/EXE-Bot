import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		if (!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.BAN_MEMBERS) &&
			!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) {
			await this.int.reply({
				content: 'You dont have permissions to run that command.',
				ephemeral: true
			});
			return false;
		}

		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (this.int.user.id == user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Why do you want to ban yourself...?')
					.setTitle('Are you serious?')],
				ephemeral: true
			});
			return false;
		}

		if (user.id == this.client.user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('WHY ME!!!???')
					.setTitle(';-;')],
				ephemeral: true
			});
			return false;
		}

		const memberCanBan = (this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.BAN_MEMBERS);
		const isLowerRole = (this.int.member as discord.GuildMember).roles.highest.comparePositionTo(user.roles.highest) > 0;

		if (!memberCanBan || !isLowerRole || user.id == this.int.guild.ownerId) {
			await this.int.reply({
				content: 'You don\'t have permissions to ban that member',
				ephemeral: true
			});
			return false;
		}

		const iCanBan = this.int.guild.me.permissions.has(discord.Permissions.FLAGS.BAN_MEMBERS);

		if (!iCanBan || !user.kickable) {
			await this.int.reply({
				content: 'I don\'t have permissions to do that',
				ephemeral: true
			});
			return false;
		}

		await user.ban();
		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setTitle('Banned')
				.setDescription(`Succesfully banned: ${user.user.tag}`)]
		});
		return true;
	}
}
