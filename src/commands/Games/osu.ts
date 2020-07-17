import discord from 'discord.js';
import { fixDecimals, formatNumber } from '../../util.js';
import config from '../../config.js';
import _osuApi from 'node-osu';
import olc from 'osulevelcalculator.js';
import iso31661alpha2 from 'iso-3166-1-alpha-2';
let wikis = new config().GetWikis();
let OsuKey = new config().GetOsuKey();
let osulevel = new olc.LevelCalculator();
let osuApi = new _osuApi.Api(OsuKey, {
	notFoundAsError: false
});

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let command_prefix = msg.content.split(` `)[0];
		let args = msg.content.split(` `).slice(1).join(` `);

		if (args == ``) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.addField(`Help`, `Check the [wiki](${wikis.commands}#osu) for help!`)
				.setDescription(`Please specify an username!`));
			return;
		}

		//#region Mode
		let mode: 0 | 1 | 2 | 3 = 0;
		if (msg.content.includes(`--mode std`)) mode = 0;
		if (msg.content.includes(`--mode taiko`)) mode = 1;
		if (msg.content.includes(`--mode ctb`)) mode = 2;
		if (msg.content.includes(`--mode mania`)) mode = 3;
		//#endregion

		//#region User
		let user;
		user = msg.content.substring(command_prefix.length, msg.content.length)
			.replace(`--mode std`, ``)
			.replace(`--mode taiko`, ``)
			.replace(`--mode ctb`, ``)
			.replace(`--mode mania`, ``)
			.replace(`--best`, ``).trim();
		//#endregion

		osuApi.getUser({
			m: mode,
			type: `string`,
			event_days: 0,
			u: user
		}).then((user) => {
			if (user.id == undefined) {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Error`)
					.addField(`Help`, `Check the [wiki](${wikis.commands}#osu) for help!`)
					.setDescription(`**Possible reasons:** \n` +
						`User does not exists \n` +
						`You entered the wrong modifiers`)
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
			} else {
				let userTotalScore = (user.scores.total == null) ? 0 : user.scores.total;
				let nextLevel = osulevel.ScoreLevelCalculator((Math.floor(user.level) + 1), userTotalScore);
				if (nextLevel == undefined) nextLevel = null;

				let seconds = Math.floor(user.secondsPlayed) % 60;
				let minutes = Math.floor(Math.floor(user.secondsPlayed) / 60) % 60;
				let hours = Math.floor(Math.floor(Math.floor(user.secondsPlayed) / 60) / 60) % 24;
				let days = Math.floor(Math.floor(Math.floor(Math.floor(user.secondsPlayed) / 60) / 60) / 24);

				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 58, 255])
					.setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
					.setThumbnail(`https://a.ppy.sh/${user.id}`)
					.addField(`General`,
						`**ID:** ${user.id}\n` +
						`**Country:** ${user.country} (${iso31661alpha2.getCountry(user.country)})\n` +
						`**PP:** ${user.pp.raw}\n` +
						`**Level:** ${user.level}\n` +
						`**Accuracy:** ${fixDecimals(user.accuracy)}%\n` +
						`**Join Date:** ${(user.joinDate as Date).toUTCString()}\n` +
						`**Play Time:** ${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Seconds\n` +
						`**Play Count:** ${user.counts.plays}\n`, true)
					.addField(`Count Ranks`,
						`**SS/SSH:** ${user.counts.SS}/${user.counts.SSH}\n` +
						`**S/SH:** ${user.counts.S}/${user.counts.SH}\n` +
						`**A:** ${user.counts.A}`, true)
					.addField(`Ranks`,
						`**Global:** ${user.pp.rank}\n` +
						`**Country:** ${user.pp.countryRank}`, true)
					.addField(`Count Notes`,
						`**300:** ${user.counts[300]}\n` +
						`**100:** ${user.counts[100]}\n` +
						`**50:** ${user.counts[50]}`, true)
					.addField(`Scores`,
						`**Total:** ${formatNumber(user.scores.total)}\n` +
						`**Ranked:** ${formatNumber(user.scores.ranked)}\n` +
						`**Score nedded to reach Lvl.${(Math.floor(user.level) + 1)}:** ${formatNumber(nextLevel)}`, true)
					.addField(`Links`,
						`[**User**](https://osu.ppy.sh/u/${user.id})\n` +
						`[**Avatar**](http://s.ppy.sh/a/${user.id})`, true));
			}
		}).catch((err) => {
			if (err == `SyntaxError: Unexpected token < in JSON at position 0`) {
				msg.channel.send(new discord.MessageEmbed()
					.setAuthor(`osu! Server failure!`, `https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg`)
					.setColor([255, 0, 0])
					.setFooter(`this is bad af`)
					.addField(`osu! Servers got down!`, `Check [@osustatus](https://twitter.com/osustatus) for info`));
			} else {
				throw err;
			}
		});
	}
}
