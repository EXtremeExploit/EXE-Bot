const main = new (require('../scripts/scripts')).Main();
const data = main.getData();
var osuApiKey = data.osuApiKey();
const functions = main.getFunctions();
const discord = require('discord.js');
const { Client } = require('discord.js');
const osuApi = require('osu.js').api(osuApiKey);
class OsuReplies {
	/**
	 * 
	 * @param {Client} client 
	 */
	constructor(client) {
		client.on('message', (msg) => {
			if(!msg.guild) return;
			if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') == true) {
				if (msg.content.startsWith('https://osu.ppy.sh/b/')) {
					var beatmap_id = msg.content.split('/')[4];
					osuApi.getBeatmaps({
						b: beatmap_id
					}).then((bmF) => {
						if (!bmF.length < 1) {
							var bm = bmF[0];
							switch (bm.approved) {
								case -2: bm.approved = 'Graveyard'; break;
								case -1: bm.approved = 'WIP'; break;
								case 0: bm.approved = 'Pending'; break;
								case 1: bm.approved = 'Ranked'; break;
								case 2: bm.approved = 'Approved'; break;
								case 3: bm.approved = 'Qualified'; break;
								case 4: bm.approved = 'Loved'; break;
							}
							if (bm.approved_date == null) bm.approved_date = '*null*';
							if (bm.source == '' || bm.source == null) bm.source = '*null*';
							if (bm.tags == '' || bm.tags == null) bm.tags = '*null*';
							if (bm.artist == '' || bm.artist == null) bm.artist = '*null*';

							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 58, 255])
								.setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
								.setTitle('osu!Beatmap')
								.addField('Basic', '**Artist:** ' + bm.artist + '\n' +
									'**Title:** ' + bm.title + '\n' +
									'**Creator:** [' + bm.creator + '](https://osu.ppy.sh/u/' + bm.creator + ')\n' +
									'**Difficulty Name:** ' + bm.version + '\n' +
									'**Source:** ' + bm.source + '\n' +
									'**BPM:** ' + bm.bpm + '\n' +
									'**Max Combo:** ' + bm.max_combo + 'x\n' +
									'**Status:** ' + bm.approved, true)
								.addField('Difficulty', '**Stars:** ' + functions.fixDecimals(bm.difficultyrating) + '*\n' +
									'**HP:** ' + bm.diff_drain + '\n' +
									'**OD:** ' + bm.diff_overall + '\n' +
									'**AR:** ' + bm.diff_approach + '\n' +
									'**CS:** ' + bm.diff_size, true)
								.addField('IDs', '**BeatmapSet:** ' + bm.beatmapset_id + '\n' +
									'**Beatmap:** ' + bm.beatmap_id, true)
								.addField('Links', '[**Set**](https://osu.ppy.sh/s/' + bm.beatmapset_id + ')\n' +
									'[**Beatmap**](https://osu.ppy.sh/b/' + bm.beatmap_id + ')\n' +
									'[**Download**](https://osu.ppy.sh/d/' + bm.beatmapset_id + ')([no vid](https://osu.ppy.sh/d/' + bm.beatmapset_id + 'n))', true));
						}
					});
				}
				if (msg.content.startsWith('https://osu.ppy.sh/u/')) {
					var user_id = msg.content.split('/')[4];
					osuApi.getUser({
						u: user_id
					}).then((userF) => {
						if (!userF.length < 1) {
							var user = userF[0];
							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 58, 255])
								.setAuthor(user.username, 'https://a.ppy.sh/' + user.user_id)
								.setThumbnail('https://a.ppy.sh/' + user.user_id)
								.addField('General', '**ID:** ' + user.user_id + '\n' +
									'**Country:** ' + user.country + '\n' +
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
								.addField('Scores', 'Total: ' + user.total_score + '\n' + 'Ranked: ' + user.ranked_score, true)
								.addField('Links', '[**User**](https://osu.ppy.sh/u/' + user.user_id + ')\n' +
									'[**Avatar**](https://a.ppy.sh/' + user.user_id + ')', true));
						}
					});
				}
			}
		});
	}

}


module.exports = OsuReplies;
