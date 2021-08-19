import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const ammount = this.int.options.getInteger('ammount');

		if (!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES) &&
			!(this.int.member as discord.GuildMember).permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setTitle('ERROR')
					.setDescription('You dont have permissions to run that command.')
					.setColor([255, 0, 0])]
			});
			return false;
		}

		if (ammount < 2 || ammount > 99) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setDescription('Ammount should be between 2 and 99!')
					.setColor([255, 0, 0])]
			});
			return false;
		}

		await (this.int.channel as discord.TextChannel).bulkDelete(ammount, true);
	}
}
