import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const role = this.int.options.getRole('role') as discord.Role;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor([0, 0, 255])
				.addField('Name', role.name)
				.addField('ID', role.id)
				.addField('Hex Color', role.hexColor)
				.addField('Position', (role.position + 1).toString())
				.addField('Mentionable', role.mentionable.toString())
				.addField('Managed by a Bot', role.managed.toString())
				.addField('Display separately from online members', role.hoist.toString())
				.addField('Member Count', role.members.size.toString())]
		});
		return true;
	}
}
