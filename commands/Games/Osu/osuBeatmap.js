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
const discord = require('discord.js');
const { Message, Client } = discord;
//#region Osu Module
const _osuapi = require('osu.js');
const osuApi = _osuapi.api(osuApiKey); //Get one at https://osu.ppy.sh/p/api
//#endregion
class osuBeatmap {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (args == '' || args == null) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
				.setDescription('Please specify a beatmap ID'));
		} else {
			if (args.startsWith('https://osu.ppy.sh/s/')) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle('Error')
					.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
					.setDescription('try a beatmap instead of a set of beatmaps!')
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
			} else {
				osuApi.getBeatmaps({
					b: parseInt(args)
				}).then((beatmap) => {
					if (beatmap.length < 1) {
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 0, 0])
							.setTitle('Error')
							.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
							.setDescription('Beatmap does not exists')
							.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
					} else {
						var bm = beatmap[0];
						var status;
						switch (bm.approved) {
							case '-2': status = 'Graveyard'; break;
							case '-1': status = 'WIP'; break;
							case '0': status = 'Pending'; break;
							case '1': status = 'Ranked'; break;
							case '2': status = 'Approved'; break;
							case '3': status = 'Qualified'; break;
							case '4': status = 'Loved'; break;
						}
						if (bm.approved_date == null) bm.approved_date = '*null*';
						if (bm.source == '' || bm.source == null) bm.source = '*null*';
						if (bm.tags == '' || bm.tags == null) bm.tags = '*null*';
						if (bm.artist == '' || bm.artist == null) bm.artist = '*null*';

						var _approved_date_date = new Date(bm.approved_date + ' UTC');
						var approved_date;
						if (isNaN(_approved_date_date.getTime())) approved_date = '';
						else {
							var _approved_date = {
								year: _approved_date_date.getFullYear(),
								month: _approved_date_date.getMonth() + 1,
								day: _approved_date_date.getDate(),
								hours: _approved_date_date.getHours(),
								minutes: _approved_date_date.getMinutes()
							};
							approved_date = ' (' + _approved_date.year + '/' + _approved_date.month + '/' + _approved_date.day + ' @ ' + _approved_date.hours + ':' + _approved_date.minutes + ' UTC)';
						}


						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 58, 255])
							.setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
							.setTitle('osu!Beatmap')
							.addField('Basic', '**Artist:** ' + bm.artist + '\n' +
								'**Title:** ' + bm.title + '\n' +
								'**Creator:** [' + bm.creator + '](https://osu.ppy.sh/u/' + bm.creator.replace(' ', '%20') + ')\n' +
								'**Difficulty Name:** ' + bm.version + '\n' +
								'**Source:** ' + bm.source + '\n' +
								'**BPM:** ' + bm.bpm + '\n' +
								'**Max Combo:** ' + bm.max_combo + 'x\n' +
								'**Status:** ' + status + approved_date, true)
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
			}
		}
	}
}
module.exports = osuBeatmap;
