import discord from 'discord.js';
import { convertMS } from '../../util.js';
import os from 'os';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const miliseconds = this.client.uptime % 1000;
		const seconds = Math.floor(this.client.uptime / 1000) % 60;
		const minutes = Math.floor(Math.floor(this.client.uptime / 1000) / 60) % 60;
		const hours = Math.floor(Math.floor(Math.floor(this.client.uptime / 1000) / 60) / 60) % 24;
		const days = Math.floor(Math.floor(Math.floor(Math.floor(this.client.uptime / 1000) / 60) / 60) / 24);

		const ram = {
			heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
			heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
			rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100,
			arrayBuffers: Math.round(process.memoryUsage().arrayBuffers / 1024 / 1024 * 100) / 100,
			external: Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100,
			total: os.totalmem() / 1048576,
		};

		let sysuptimestr = '';
		const sysuptime = convertMS(os.uptime() * 1000);
		if (sysuptime.days != 0)
			sysuptimestr += `${sysuptime.days} D, `;
		if (sysuptime.hours != 0)
			sysuptimestr += `${sysuptime.hours} Hr${sysuptime.hours == 1 ? '' : 's'}, `;
		if (sysuptime.minutes != 0)
			sysuptimestr += `${sysuptime.minutes} Mins, `;
		if (sysuptime.seconds != 0)
			sysuptimestr += `${sysuptime.seconds} Secs`;

		if (sysuptimestr.endsWith(', '))
			sysuptimestr.substr(0, sysuptimestr.length - 2);


		const embed = new discord.MessageEmbed()
			.setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size: 1024 }))
			.setColor([255, 0, 0])
			.setThumbnail(this.client.user.displayAvatarURL({ size: 1024 }));

		embed.addField('Bot Resources (MiB)',
			`**Heap Total:** ${ram.heapTotal.toFixed(2)}\n` +
			`**Heap Used:** ${ram.heapUsed.toFixed(2)}\n` +
			`**Array Buffers:** ${ram.arrayBuffers.toFixed(2)}\n` +
			`**External:** ${ram.external.toFixed(2)}\n` +
			`**RSS:** ${ram.rss.toFixed(2)}`, true);

		embed.addField('Stats',
			'**Servers:** ' + this.client.guilds.cache.size + '\n' +
			'**Users:** ' + this.client.users.cache.size + '\n' +
			'**Channels:** ' + this.client.channels.cache.size, true);

		embed.addField('Bot Uptime',
			`${days} Days\n` +
			`${hours} Hours\n` +
			`${minutes} Minutes\n` +
			`${seconds} Seconds\n` +
			`${miliseconds} Miliseconds`, true);

		embed.addField('Neofetch',
			`**OS:** ${os.platform()}\n` +
			`**Core:** ${os.type()}\n` +
			`**Arch:** ${os.arch()}\n` +
			`**CPU:** ${os.cpus()[0].model} @ ${os.cpus()[0].speed} MHz\n` +
			`**RAM (MiB):** ${((os.totalmem() - os.freemem()) / 1048576).toFixed(2)} / ${ram.total.toFixed(2)}\n` +
			`**Uptime:** ${sysuptimestr}`);

		embed.addField('Links',
			'[**Discord Server**](https://discord.gg/sJPmDDn)\n' +
			'[**Github Repository**](https://github.com/EXtremeExploit/EXE-Bot)', true);


		// embed.addField('Wikies',
		// 	'[**Home**](' + wikis.home + ')\n' +
		// 	'[**FAQ**](' + wikis.faq + ')', true);

		await this.int.reply({ embeds: [embed] });
		return true;
	}
}
