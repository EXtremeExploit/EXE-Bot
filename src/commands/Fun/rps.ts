import discord from 'discord.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const posibilities = ['rock', 'paper', 'scissors'];
		const pos1 = posibilities[Math.floor(Math.random() * posibilities.length)];
		const pos2 = posibilities[Math.floor(Math.random() * posibilities.length)];

		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (this.int.user.id == user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Why do you want to play with yourself...?')
					.setTitle('Are you serious?')]
			});
			return false;
		}

		const res = this.result(pos1, pos2);

		let winner;
		if (res == -1) winner = `<@${user.user.id}> Won!`;
		if (res == 0) winner = 'Draw....Nobody wins';
		if (res == 1) winner = `<@${this.int.user.id}> Won!`;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle('Rock, Paper and Scissors!')
				.setColor([255, 0, 0])
				.addField('Results',
					`<@${this.int.user.id}>: **${pos1}**\n` +
					`<@${user.id}>: **${pos2}**`)
				.addField('Winner', winner)]
		});
		return true;
	}

	result(pos1, pos2) {
		/**
		  * -1 = Lose
		  * 0 = Draw
		  * 1 = Won
		  */
		if (pos1 == 'rock' && pos2 == 'rock')
			return 0;
		if (pos1 == 'rock' && pos2 == 'paper')
			return -1;
		if (pos1 == 'rock' && pos2 == 'scissors')
			return 1;
		if (pos1 == 'paper' && pos2 == 'rock')
			return 1;
		if (pos1 == 'paper' && pos2 == 'paper')
			return 0;
		if (pos1 == 'paper' && pos2 == 'scissors')
			return -1;
		if (pos1 == 'scissors' && pos2 == 'rock')
			return -1;
		if (pos1 == 'scissors' && pos2 == 'paper')
			return 1;
		if (pos1 == 'scissors' && pos2 == 'scissors')
			return 0;
	}
}
