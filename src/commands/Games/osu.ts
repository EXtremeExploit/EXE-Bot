import discord from 'discord.js';
import { fixDecimals, formatNumber, convertDate, cleanMods, osuUserCheckUndefinedsOrNulls } from '../../util.js';
import config from '../../config.js';
import _osuApi from 'node-osu';
import olc from 'osulevelcalculator.js';
import iso31661alpha2 from 'iso-3166-1-alpha-2';
const OsuKey = new config().getOsuKey();
const osuApi = new _osuApi.Api(OsuKey, {
	notFoundAsError: false,
	completeScores: true
});

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const user = this.int.options.getString('username');
		const mode = Number(this.int.options.getString('mode')) as 0 | 1 | 2 | 3;

		let endpoint = this.int.options.getString('endpoint');

		if (endpoint == null) endpoint = 'user';

		switch (endpoint) {
			case 'user': {
				osuApi.getUser({
					m: mode,
					type: 'string',
					event_days: 0,
					u: user
				}).then(async (user) => {
					if (user.id == undefined) {
						this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.setDescription('**Possible reasons:** \n' +
									'User does not exists \n' +
									'osu! servers are down')
								.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))],
							ephemeral: true
						});
						return false;
					}
					const userTotalScore = (user.scores.total == null) ? 0 : user.scores.total;
					let nextLevel = olc((Math.floor(user.level) + 1), userTotalScore);
					if (nextLevel == undefined) nextLevel = null;

					const seconds = Math.floor(user.secondsPlayed) % 60;
					const minutes = Math.floor(Math.floor(user.secondsPlayed) / 60) % 60;
					const hours = Math.floor(Math.floor(Math.floor(user.secondsPlayed) / 60) / 60) % 24;
					const days = Math.floor(Math.floor(Math.floor(Math.floor(user.secondsPlayed) / 60) / 60) / 24);

					let modestr;
					switch (mode) {
						case 0: modestr = ''; break;
						case 1: modestr = 'Taiko'; break;
						case 2: modestr = 'CatchTheBeat'; break;
						case 3: modestr = 'Mania'; break;
					}

					user = osuUserCheckUndefinedsOrNulls(user);

					await this.int.reply({
						embeds: [new discord.MessageEmbed()
							.setColor([255, 58, 255])
							.setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
							.setThumbnail(`https://a.ppy.sh/${user.id}`)
							.setDescription('osu!' + modestr + ' | ID: ' + user.id)
							.addField('General',
								`**Country:** ${iso31661alpha2.getCountry(user.country)}\n` +
								`**Performance:** ${user.pp.raw}pp (#${user.pp.rank})/(${user.country}#${user.pp.countryRank})\n` +
								`**Level:** ${user.level}\n` +
								`**Accuracy:** ${fixDecimals(user.accuracy)}%\n` +
								`**Join Date:** ${(user.joinDate as Date).toUTCString()}\n` +
								`**Play Time:** ${days}D, ${hours} H, ${minutes} M, ${seconds} S (${Math.floor(Math.floor(Math.floor(user.secondsPlayed) / 60) / 60)} Hours)\n` +
								`**Play Count:** ${user.counts.plays}\n`)
							.addField('Counts',
								`**SS/SSH:** ${user.counts.SS}/${user.counts.SSH}\n` +
								`**S/SH:** ${user.counts.S}/${user.counts.SH}\n` +
								`**A:** ${user.counts.A}\n` +
								`**300:** ${user.counts[300]}\n` +
								`**100:** ${user.counts[100]}\n` +
								`**50:** ${user.counts[50]}`, true)
							.addField('Scores',
								`**Total:** ${formatNumber(user.scores.total)}\n` +
								`**Ranked:** ${formatNumber(user.scores.ranked)}\n` +
								`**Score nedded to reach Lvl.${(Math.floor(user.level) + 1)}:** ${formatNumber(nextLevel)}`, true)
							.addField('Links',
								`[**User**](https://osu.ppy.sh/u/${user.id})\n` +
								`[**Avatar**](http://s.ppy.sh/a/${user.id})`, true)]
					});
					return true;
				}).catch(async (err) => {
					if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
								.setColor([255, 0, 0])
								.setFooter('this is bad af')
								.addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info')],
							ephemeral: true
						});
					} else {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.setDescription('**Possible reasons:**\n' +
									'User does not exists\n' +
									'Doesnt have any plays in your search\n' +
									'osu! servers are down')
								.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))],
							ephemeral: true
						});
					}
					return false;
				});
			}
				break;
			case 'best': {
				osuApi.getUserBest({
					u: user,
					m: mode,
					type: 'string',
					limit: 5
				}).then(async (playF) => {
					let desc = '';
					for (let i = 0; i < playF.length; i++) {
						const play = playF[i];
						if (play.rank == 'S') play.rank = 'S (Gold)';
						if (play.rank == 'SH') play.rank = 'S (Silver)';
						if (play.rank == 'X') play.rank = 'SS (Gold)';
						if (play.rank == 'XH') play.rank = 'SS (Silver)';
						const date = convertDate(new Date(play.raw_date + ' UTC'), 0, true);

						const mods = cleanMods((play.mods as string[]));

						desc += `**${i + 1}. ${play.pp}pp**` +
							`\n[${play.beatmap.artist} - ${play.beatmap.title} [${play.beatmap.version}]](https://osu.ppy.sh/s/${play.beatmap.beatmapSetId})${mods}\n` +
							`${play.score} / ${play.maxCombo}x(${play.beatmap.maxCombo}x) {300:${play.counts[300]} 100:${play.counts[100]} 50:${play.counts[50]} M:${play.counts.miss}}\n` +
							`${((play.accuracy as number) * 100).toFixed(2)}% / ${play.rank} / ${date}\n\n`;
					}

					if (desc == '') desc = 'This user has no best performance plays :c';

					let modestr;
					switch (mode) {
						case 0: modestr = ''; break;
						case 1: modestr = 'Taiko'; break;
						case 2: modestr = 'CatchTheBeat'; break;
						case 3: modestr = 'Mania'; break;
					}
					await this.int.reply({
						embeds: [new discord.MessageEmbed()
							.setDescription(desc)
							.setColor(0xFF0000)
							.setTimestamp(new Date().valueOf())
							.setTitle('Best plays in osu!' + modestr)
							.setAuthor(user, `https://a.ppy.sh/${playF[0].user.id}`, `https://osu.ppy.sh/u/${playF[0].user.id}`)]
					});
					return true;
				}).catch(async (err) => {
					if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
								.setColor([255, 0, 0])
								.setFooter('this is bad af')
								.addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info')],
							ephemeral: true
						});
					} else {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.setDescription('**Possible reasons:**\n' +
									'User does not exists\n' +
									'Doesnt have any plays in your search\n' +
									'osu! servers are down')
								.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))],
							ephemeral: true
						});
					}
					return false;
				});
			}
				break;
			case 'recent': {
				osuApi.getUserRecent({
					u: user,
					m: mode,
					type: 'string',
					limit: 5
				}).then(async (playF) => {
					let desc = '';
					for (let i = 0; i < playF.length; i++) {
						const play = playF[i];
						const mods = cleanMods((play.mods as string[]));
						if (play.rank == 'S') play.rank = 'S (Gold)';
						if (play.rank == 'SH') play.rank = 'S (Silver)';
						if (play.rank == 'X') play.rank = 'SS (Gold)';
						if (play.rank == 'XH') play.rank = 'SS (Silver)';
						const date = convertDate(new Date(play.raw_date + ' UTC'), 0, true);
						desc += `**${i + 1}. ${date}**\n` +
							`[${play.beatmap.artist} - ${play.beatmap.title} [${play.beatmap.version}]](https://osu.ppy.sh/s/${play.beatmap.beatmapSetId})${mods}\n` +
							`${play.score} / ${play.maxCombo}x(${play.beatmap.maxCombo}x) {${play.counts[300]}x300 ${play.counts[100]}x100 ${play.counts[50]}x50 ${play.counts.miss}xMiss}\n` +
							`${((play.accuracy as number) * 100).toFixed(2)}% / ${play.rank}\n\n`;
					}

					if (desc == '') desc = 'This user doesn\'t have any recent plays :c';

					let modestr;
					switch (mode) {
						case 0: modestr = ''; break;
						case 1: modestr = 'Taiko'; break;
						case 2: modestr = 'CatchTheBeat'; break;
						case 3: modestr = 'Mania'; break;
					}
					await this.int.reply({
						embeds: [new discord.MessageEmbed()
							.setDescription(desc)
							.setColor(0xFF0000)
							.setTimestamp(new Date().valueOf())
							.setTitle('Recent plays in osu!' + modestr)
							.setAuthor(user, `https://a.ppy.sh/${playF[0].user.id}`, `https://osu.ppy.sh/u/${playF[0].user.id}`)]
					});
					return true;
				}).catch(async (err) => {
					if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
								.setColor([255, 0, 0])
								.setFooter('this is bad af')
								.addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info')],
							ephemeral: true
						});
					} else {
						await this.int.reply({
							embeds: [new discord.MessageEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.setDescription('**Possible reasons:**\n' +
									'User does not exists\n' +
									'Doesnt have any play in your search\n' +
									'You entered the wrong modifiers')
								.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))],
							ephemeral: true
						});
					}
					return false;
				});
			}
		}
	}
}
