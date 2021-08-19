import discord from 'discord.js';
import config, { ram } from './config.js';
import { commandsArray } from './commands.js';
import { LOG_DATE, rounds } from './util.js';
const ownerId = new config().getOwnerId();

export default class {
	client: discord.Client;

	constructor(client: discord.Client) {
		this.client = client;

		this.Disconnect();
		this.Error();
		this.RateLimit();
		this.Ready();
		this.Reconnecting();
		this.Warn();

		this.Buttons();

		// This feels wrong
		process.on('unhandledRejection', async (reason, promise) => {
			console.log('Unhandled Rejection at:', promise, 'reason:', reason);
			(await client.users.fetch(ownerId)).send(`Unhandled Rejection at: ${promise}\n reason: ${reason}`);
		});
		// This feels worse
		process.on('uncaughtException', async (err) => {
			console.error(err);
			(await client.users.fetch(ownerId)).send(`\`\`\`${err.stack}\`\`\``);
		});
	}

	setStatus() {
		this.client.user.setPresence({
			status: 'dnd',
			activities: [{
				name: `${this.client.guilds.cache.size} Servers | /invite`,
				type: 'LISTENING',
			}]
		});
	}

	Ready() {
		this.client.on('ready', async () => {
			const me = this.client.user;

			console.log('==================================================');
			console.log(`TS=>JS; Node.JS ${process.version}; discord.js v${discord.version}`);
			console.log(`ID;TAG: ${me.id};${me.tag}`);
			console.log(`OwnerID;OwnerTag: ${ownerId};${(await this.client.users.fetch(ownerId)).tag}`);
			console.log(`Commands;Servers: ${commandsArray.length};${this.client.guilds.cache.size}`);
			console.log('==================================================');

			this.setStatus();
			setInterval(() => {
				this.setStatus();
			}, 30000);

		});
	}
	Disconnect() {
		this.client.on('disconnect', () => console.log(`[${LOG_DATE()}] [DISCONNECTED]`));
	}
	Reconnecting() {
		this.client.on('reconnecting', () => console.log(`[${LOG_DATE()}] [RECONNECTING...]`));
	}

	RateLimit() {
		this.client.on('rateLimit', (e) => {
			console.log('====================RATE LIMIT====================');
			console.log(`${e.method} ${e.path}`);
			console.log(`Limit;Timeout: ${e.limit};${e.timeout}`);
			console.log(`Route: ${e.route}`);
			console.log('==================================================');
		});
	}
	Warn() {
		this.client.on('warn', (info) => {
			console.log('====================WARN====================');
			console.warn(info);
			console.log('============================================');
		});
	}
	Error() {
		this.client.on('error', (error) => {
			console.log('====================ERROR====================');
			console.log(`Error Message: ${error.message}`);
			console.log(`Error Name: ${error.name}`);
			console.log(`Error Stack: ${error.stack}`);
			console.log('=============================================');
		});
	}

	Buttons() {
		this.client.on('interactionCreate', async (int: discord.ButtonInteraction) => {
			if (!int.isButton()) return;

			// Russian roulette join button
			switch (int.customId) {
				case 'rrjoin': {
					if (ram.rr.sessions[int.channelId].participants.includes(int.user.id)) { // if user isn't participating
						int.reply({ content: 'You are already in', ephemeral: true });
						return;
					}

					ram.rr.sessions[int.channelId].participants.push(int.user.id); //  add user to participants list

					const embed = ram.rr.sessions[int.channelId].embed;
					embed.setTitle(`Current Players: ${ram.rr.sessions[int.channelId].participants.length}/6`);

					let participantsText = '';
					ram.rr.sessions[int.channelId].participants.forEach((p) => { // Generate user lists text
						participantsText += `<@${p}>\n`;
					});
					embed.setDescription(participantsText);

					int.reply({ content: 'Joined!', ephemeral: true });

					if (ram.rr.sessions[int.channelId].participants.length == 6) { // The lobby is full
						(int.message as discord.Message).edit({
							content: `<@${int.user.id}> started a russian roulette, but its already full!`,
							embeds: [embed],
							components: []
						});

						const roundEmbed = rounds(int.channelId);
						int.followUp({ embeds: [roundEmbed] });
						return;
					}

					(int.message as discord.Message).edit({ embeds: [embed] });

					break;
				}
				// #region Image buttons
				case 'imagefirst': {
					ram.images.ints[int.message.id].index = 0;

					int.update({
						embeds: [
							ram.images.ints[int.message.id].embed
								.setDescription(`Displaying ${ram.images.ints[int.message.id].index + 1}/${ram.images.ints[int.message.id].imgs.length} Images`)
								.setURL(ram.images.ints[int.message.id].imgs[0].url)
								.setImage(ram.images.ints[int.message.id].imgs[0].url)
						]
					});
					break;
				}
				case 'imageback': {
					ram.images.ints[int.message.id].index--;
					if (ram.images.ints[int.message.id].index == -1)
						ram.images.ints[int.message.id].index = 0;

					int.update({
						embeds: [
							ram.images.ints[int.message.id].embed
								.setDescription(`Displaying ${ram.images.ints[int.message.id].index + 1}/${ram.images.ints[int.message.id].imgs.length} Images`)
								.setURL(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
								.setImage(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
						]
					});
					break;
				}
				case 'imagenext': {
					ram.images.ints[int.message.id].index++;

					if (ram.images.ints[int.message.id].index == ram.images.ints[int.message.id].imgs.length)
						ram.images.ints[int.message.id].index--;

					int.update({
						embeds: [
							ram.images.ints[int.message.id].embed
								.setDescription(`Displaying ${ram.images.ints[int.message.id].index + 1}/${ram.images.ints[int.message.id].imgs.length} Images`)
								.setURL(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
								.setImage(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
						]
					});
					break;
				}
				case 'imagelast': {
					ram.images.ints[int.message.id].index = ram.images.ints[int.message.id].imgs.length;
					ram.images.ints[int.message.id].index--;

					int.update({
						embeds: [
							ram.images.ints[int.message.id].embed
								.setDescription(`Displaying ${ram.images.ints[int.message.id].index + 1}/${ram.images.ints[int.message.id].imgs.length} Images`)
								.setURL(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
								.setImage(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
						]
					});
					break;
				}
				case 'imagestop': {
					int.update({
						embeds: [
							ram.images.ints[int.message.id].embed
								.setDescription(`Displaying ${ram.images.ints[int.message.id].index + 1}/${ram.images.ints[int.message.id].imgs.length} Images`)
								.setURL(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
								.setImage(ram.images.ints[int.message.id].imgs[ram.images.ints[int.message.id].index].url)
						],
						components: []
					});
					delete ram.images.ints[int.message.id];
					break;
				}
				// #endregion
			}
		});
	}
}
