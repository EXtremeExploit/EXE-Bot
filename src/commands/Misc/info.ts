import discord from 'discord.js';
import config from '../../config.js';
import { convertMS } from '../../util.js';
let wikis = new config().GetWikis();

import os from 'os';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let miliseconds = client.uptime % 1000;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		let minutes = Math.floor(Math.floor(client.uptime / 1000) / 60) % 60;
		let hours = Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) % 24;
		let days = Math.floor(Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) / 24);

		let ram = {
			total: os.totalmem() / 1048576,
			used: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
			free: os.freemem() / 1048576,
			rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100,
		};

		let sysuptimestr = '';
		let sysuptime = convertMS(os.uptime() * 1000);
		if (sysuptime.days != 0)
			sysuptimestr += `${sysuptime.days} D, `;
		if (sysuptime.hours != 0)
			sysuptimestr += `${sysuptime.hours} Hr${sysuptime.hours == 1 ? '' : 's'}, `;
		if (sysuptime.minutes != 0)
			sysuptimestr += `${sysuptime.minutes} Mins, `;
		if (sysuptime.seconds != 0)
			sysuptimestr += `${sysuptime.seconds} Secs`;
		if (sysuptimestr.endsWith(', ')) {
			sysuptimestr.substr(0, sysuptimestr.length - 2);
		}


		let embed = new discord.MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setColor([255, 0, 0])
			.setThumbnail(client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }));

		embed.addField('Device Info',
			`**System Uptime** ${sysuptimestr}\n` +
			`**RAM (MB):** ${ram.used.toFixed(2)} / ${ram.total.toFixed(2)}\n`, true);

		embed.addField('Stats',
			'**Servers:** ' + client.guilds.cache.size + '\n' +
			'**Users:** ' + client.users.cache.size + '\n' +
			'**Channels:** ' + client.channels.cache.size, true);

		embed.addField('Uptime',
			days + ' Days\n' +
			hours + ' Hours\n' +
			minutes + ' Minutes\n' +
			seconds + ' Seconds\n' +
			miliseconds + ' Miliseconds', true);

		embed.addField('Neofetch',
			`**OS:** ${os.platform()}\n` +
			`**Core:** ${os.type()}\n` +
			`**Arch:** ${os.arch()}\n` +
			`**CPU:** ${os.cpus().length}x ${os.cpus()[0].model} @ ${os.cpus()[0].speed} MHz\n` +
			`**RAM (MB):** ${((os.totalmem() - os.freemem()) / 1048576).toFixed(2)} / ${ram.total.toFixed(2)}`)

		embed.addField('Links',
			'[**Discord Server**](https://discord.gg/sJPmDDn)\n' +
			'[**Github Repository**](https://github.com/EXtremeExploit/EXE-Bot)', true);


		embed.addField('Wikies', '[**Home**](' + wikis.home + ')\n' +
			'[**Commands**](' + wikis.commands + ')\n' +
			'[**Replies**](' + wikis.replies + ')\n' +
			'[**FAQ**](' + wikis.faq + ')', true);

		(msg.channel as discord.TextChannel).send(embed);
	}
}