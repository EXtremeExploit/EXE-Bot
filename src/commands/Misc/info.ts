import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

import os from 'os';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		var miliseconds = client.uptime % 1000;
		var seconds = Math.floor(client.uptime / 1000) % 60;
		var minutes = Math.floor(Math.floor(client.uptime / 1000) / 60) % 60;
		var hours = Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) % 24;
		var days = Math.floor(Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) / 24);

		var ram = {
			total: os.totalmem() / 1048576,
			used: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
			free: os.freemem() / 1048576,
			rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100,
			external: Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100
		};

		var embed = new discord.MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setColor([255, 0, 0])
			.setThumbnail(client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }));

		embed.addField('Usages', '**RAM:** ' + ram.used.toFixed(3) + ' MB / ' + ram.total.toFixed(3) + ' MB\n' +
			'**Free RAM:** ' + ram.free.toFixed(2) + ' MB\n' +
			'**RSS RAM:** ' + ram.rss + ' MB\n' +
			'**External RAM:** ' + ram.external + ' MB', true);

		embed.addField('Counts', '**Servers:** ' + client.guilds.cache.size + '\n' +
			'**Users:** ' + client.users.cache.size + '\n' +
			'**Channels:** ' + client.channels.cache.size, true);

		embed.addField('Uptime', days + ' Days\n' +
			hours + ' Hours\n' +
			minutes + ' Minutes\n' +
			seconds + ' Seconds\n' +
			miliseconds + ' Miliseconds', true);

		embed.addField('Links', '[**Page**](https://extremeexploit.github.io/EXE_Bot)\n' +
			'[**Discord Server**](https://discord.gg/sJPmDDn)\n' +
			'[**Github Repository**](https://github.com/EXtremeExploit/EXE-Bot)', true);


		embed.addField('Wikies', '[**Home**](' + wikis.home + ')\n' +
			'[**Commands**](' + wikis.commands + ')\n' +
			'[**Replies**](' + wikis.replies + ')\n' +
			'[**FAQ**](' + wikis.faq + ')', true);

		(msg.channel as discord.TextChannel).send(embed);
	}
}