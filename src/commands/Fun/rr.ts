import discord, { MessageButton } from 'discord.js';
import { ram } from '../../config.js';
import { rounds } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		if (ram.rr[this.int.channelId]) {
			this.int.reply('There is already a russian roulette in this channel!');
			return false;
		}

		const embed = new discord.MessageEmbed()
			.setTitle('Current Players: 1/6')
			.setColor(0xFF0000)
			.setAuthor('Russian Roulette')
			.setDescription(`<@${this.int.user.id}>`);

		ram.rr.sessions[this.int.channelId] = {
			participants: [
				this.int.user.id
			],
			embed: embed
		};

		const row = new discord.MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('rrjoin')
					.setLabel('Join')
					.setStyle('PRIMARY'));

		await this.int.reply({
			content: `<@${this.int.user.id}> started a russian roulette, join while you can!`,
			embeds: [embed],
			components: [row]
		});

		setTimeout(async () => {
			await this.int.editReply({
				content: `<@${this.int.user.id}> started a russian roulette, but it already timed out!`,
				components: []
			});

			if (ram.rr.sessions[this.int.channelId].participants.length > 1) {
				const roundEmbed = rounds(this.int.channelId);
				await this.int.followUp({ embeds: [roundEmbed] });
			} else
				await this.int.followUp({ content: 'No one joined your roulette, :c' });

			delete ram.rr.sessions[this.int.channelId];
		}, 20000);
	}
}
