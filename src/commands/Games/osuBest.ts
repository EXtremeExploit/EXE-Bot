import discord from 'discord.js';
import _osuApi from 'node-osu';
import { fixDecimals, convertDate } from '../../util.js'
import config from '../../config.js';
let wikis = new config().GetWikis();
let OsuKey = new config().GetOsuKey();
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

		osuApi.getUserBest({
			u: user,
			m: mode,
			type: `string`,
			limit: 1
		}).then(async (playF) => {
			let play = playF[0];
			let map = await osuApi.getBeatmaps({ b: (play.beatmapId as string) });
			let bm = map[0];
			let user = await osuApi.getUser({ u: play.user.id, type: `id` });
			let date = new Date(play.raw_date + ` UTC`);
			if (play.rank == `S`) play.rank = `S (Gold)`;
			if (play.rank == `SH`) play.rank = `S (Silver)`;
			if (play.rank == `X`) play.rank = `SS (Gold)`;
			if (play.rank == `XH`) play.rank = `SS (Silver)`;
			msg.channel.send(new discord.MessageEmbed()
				.setThumbnail(`https://b.ppy.sh/thumb/${bm.beatmapSetId}l.jpg`)
				.setColor([255, 58, 255])
				.addField(`Map`,
					`**Name:** [${bm.artist} - ${bm.title} [${bm.version}]](https://osu.ppy.sh/s/${bm.beatmapSetId})\n` +
					`**BPM:** ${bm.bpm}\n` +
					`**ID:** ${bm.id}\n` +
					`**Stars:** ${fixDecimals(bm.difficulty.rating)}*\n` +
					`**Creator:** [${bm.creator}](https://osu.ppy.sh/u/${bm.creator})`, true)
				.addField(`Play`,
					`**PP:** ${play.pp}\n` +
					`**User:** [${user.name}](https://osu.ppy.sh/u/${user.id})\n` +
					`**Rank:** ${play.rank}\n` +
					`**Score:** ${play.score}\n` +
					`**Max Combo:** ${play.maxCombo}/${bm.maxCombo}`, true)
				.addField(`Count Notes`,
					`**300:** ${play.counts[300]}\n` +
					`**100:** ${play.counts[100]}\n` +
					`**50:** ${play.counts[50]}\n` +
					`**Misses:** ${play.counts.miss}`, true)
				.addField(`Date`, convertDate(date), true)
				.addField(`Links`,
					`[**Download**](https://osu.ppy.sh/d/${bm.beatmapSetId})([no vid](https://osu.ppy.sh/d/${bm.beatmapSetId}))\n` +
					`[**User**](https://osu.ppy.sh/u/${play.user.id})`, true));
		}).catch((err) => {
			if (err == `SyntaxError: Unexpected token < in JSON at position 0`) {
				msg.channel.send(new discord.MessageEmbed()
					.setAuthor(`osu! Server failure!`, `https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg`)
					.setColor([255, 0, 0])
					.setFooter(`this is bad af`)
					.addField(`osu! Servers got down!`, `Check [@osustatus](https://twitter.com/osustatus) for info`));
			} else {
				if (err == `TypeError: Cannot read property \`beatmap_id\` of undefined`) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle(`Error`)
						.addField(`Help`, `Check the [wiki](${wikis.commands}#osu) for help!`)
						.setDescription(`**Possible reasons:** }\n` +
							`User does not exists }\n` +
							`Doesnt have any play in your search\n` +
							`You entered the wrong modifiers`)
						.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
				} else {
					throw err;
				}
			}

		});
	}
}
