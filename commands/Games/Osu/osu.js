const main = require('../../commands').Main;
const functions = main.getFunctions();
const data = main.getData();
var osuApiKey = data.osuApiKey();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};

const iso31661alpha2 = require('iso-3166-1-alpha-2');
const discord = require('discord.js');
const { Message, Client } = discord;
//#region Osu Module
const _osuapi = require('osu.js');
const osuApi = _osuapi.api(osuApiKey); //Get one at https://osu.ppy.sh/p/api
const osulevel = require('osulevelcalculator.js').api();
//#endregion
class osu {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var args = messageArray.slice(1).join(' ');

		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
				.setDescription('Please specify an username!'));
		} else {
			//#region Mode
			var mode = 0;
			if (msg.content.includes('--mode std')) mode = 0;
			if (msg.content.includes('--mode taiko')) mode = 1;
			if (msg.content.includes('--mode ctb')) mode = 2;
			if (msg.content.includes('--mode mania')) mode = 3;
			//#endregion

			//#region Best
			var best = false;
			if (msg.content.includes('--best')) best = true;
			//#endregion

			//#region User
			var user;
			user = msg.content.substring(command_prefix.length, msg.content.length)
				.replace('--mode std', '')
				.replace('--mode taiko', '')
				.replace('--mode ctb', '')
				.replace('--mode mania', '')
				.replace('--best', '').trim();
			//#endregion

			if (!best) {
				osuApi.getUser({
					m: mode,
					type: 'string',
					event_days: 0,
					u: user
				}).then(async (userF) => {
					if (userF.length < 1) {
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 0, 0])
							.setTitle('Error')
							.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
							.setDescription('**Can be for the possible reasons:** \n' +
								'User does not exists \n' +
								'You entered the wrong modifiers')
							.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
					} else {
						var user = userF[0];
						var userTotalScore = (user.total_score == null) ? 0 : user.total_score;
						var nextLevel = await osulevel.calculateLevelCOM(userTotalScore, (Math.floor(user.level) + 1));
						if (nextLevel.result == undefined) nextLevel.result = null;
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 58, 255])
							.setAuthor(user.username, 'https://a.ppy.sh/' + user.user_id, 'https://osu.ppy.sh/u/' + user.user_id)
							.setThumbnail('https://a.ppy.sh/' + user.user_id)
							.addField('General', '**ID:** ' + user.user_id + '\n' +
								'**Country:** ' + user.country + ' (' + iso31661alpha2.getCountry(user.country) + ')\n' +
								'**PP:** ' + user.pp_raw + '\n' +
								'**Level:** ' + user.level + '\n' +
								'**Accuracy:** ' + functions.fixDecimals(user.accuracy) + '%\n' +
								'**Play Count:** ' + user.playcount + '\n', true)
							.addField('Count Ranks', '**SS:** ' + user.count_rank_ss + '\n' +
								'**S:** ' + user.count_rank_s + '\n' +
								'**A:** ' + user.count_rank_a, true)
							.addField('Ranks', '**Global:** ' + user.pp_rank + '\n' +
								'**Country:** ' + user.pp_country_rank, true)
							.addField('Count Notes', '**300:** ' + user.count300 + '\n' +
								'**100:** ' + user.count100 + '\n' +
								'**50:** ' + user.count50, true)
							.addField('Scores', '**Total:** ' + user.total_score + '\n' +
								'**Ranked:** ' + user.ranked_score + '\n' +
								'**Score nedded to reach Lvl.' + (Math.floor(user.level) + 1) + ':** ' + nextLevel.result, true)
							.addField('Links', '[**User**](https://osu.ppy.sh/u/' + user.user_id + ')\n' +
								'[**Avatar**](https://a.ppy.sh/' + user.user_id + ')', true));
					}
				}).catch((err) => {
					if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
						msg.channel.send(new discord.RichEmbed()
							.setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
							.setColor([255, 0, 0])
							.setFooter('this is bad af')
							.addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info'));
					} else {
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 0, 0])
							.setTitle('Error')
							.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
							.setDescription('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!')
							.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
						console.log(err);
					}
				});
			} else {
				osuApi.getUserBest({
					u: user,
					m: mode,
					type: 'string',
					limit: 1
				}).then(async (playF) => {
					var play = playF[0];
					var map = await osuApi.getBeatmaps({ b: play.beatmap_id });
					var bm = map[0];
					var _user = await osuApi.getUser({ u: play.user_id, type: 'id' });
					var user = _user[0];
					var date = new Date(play.date + ' UTC');
					if (play.rank == 'S') play.rank = 'S (Gold)';
					if (play.rank == 'SH') play.rank = 'S (Silver)';
					if (play.rank == 'X') play.rank = 'SS (Gold)';
					if (play.rank == 'XH') play.rank = 'SS (Silver)';
					msg.channel.send(new discord.RichEmbed()
						.setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
						.setColor([255, 58, 255])
						.addField('Map', '**Name:** [' + bm.artist + ' - ' + bm.title + ' [' + bm.version + ']](https://osu.ppy.sh/s/' + bm.beatmapset_id + ')\n' +
							'**BPM:** ' + bm.bpm + '\n' +
							'**ID:** ' + bm.beatmap_id + '\n' +
							'**Stars:** ' + functions.fixDecimals(bm.difficultyrating) + '*\n' +
							'**Creator:** ' + '[' + bm.creator + '](https://osu.ppy.sh/u/' + bm.creator + ')', true)
						.addField('Play', '**PP:** ' + play.pp + 'pp\n' +
							'**User:** [' + user.username + '](https://osu.ppy.sh/u/' + user.user_id + ')\n' +
							'**Rank:** ' + play.rank + '\n' +
							'**Score:** ' + play.score + '\n' +
							'**Max Combo:** ' + play.maxcombo + 'x /' + bm.max_combo + 'x', true)
						.addField('Count Notes', '**300:** ' + play.count300 + '\n' +
							'**100:** ' + play.count100 + '\n' +
							'**50:** ' + play.count50 + '\n' +
							'**Misses:** ' + play.countmiss, true)
						.addField('Date', date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' @ ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' UTC', true)
						.addField('Links', '[**Download**](https://osu.ppy.sh/d/' + bm.beatmapset_id + ')([no vid](https://osu.ppy.sh/d/' + bm.beatmapset_id + 'n))\n' +
							'[**User**](https://osu.ppy.sh/u/' + play.user_id + ')', true));
				}).catch((err) => {
					if (err == 'SyntaxError: Unexpected token < in JSON at position 0') {
						msg.channel.send(new discord.RichEmbed()
							.setAuthor('osu! Server failure!', 'https://pbs.twimg.com/profile_images/706719922596900864/xTzREmuc_400x400.jpg')
							.setColor([255, 0, 0])
							.setFooter('this is bad af')
							.addField('osu! Servers got down!', 'Check [@osustatus](https://twitter.com/osustatus) for info'));
					} else {
						if (err == 'TypeError: Cannot read property \'beatmap_id\' of undefined') {
							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
								.setDescription('**Can be for the possible reasons:** \n' +
									'User does not exists \n' +
									'Doesnt have any play in your search \n' +
									'You entered the wrong modifiers')
								.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
						} else {
							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 0, 0])
								.setTitle('Error')
								.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
								.setDescription('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!')
								.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
							console.log(err);
						}
					}

				});
			}
		}

	}
}
module.exports = osu;
