const _main = require('../index');
const main = new _main.Main();
const data = main.getData();
const token = data.token();
const osuApiKey = data.osuApiKey();
const discordBotsToken = data.discordBots().token;
var servers = data.servers();
const discord = require('discord.js');
const yt = require('ytdl-core');
var os = require("os");
const { GuildMember, RichEmbed, Message, VoiceConnection } = discord;

//#region Osu Module
const _osuapi = require('osu.js');
const { Beatmap, Best, GamesOptions, Match, MatchOptions, Recent, Replay, Scores, ScoresOptions, User, UserEvents } = _osuapi;
class Functions {
	constructor() { }
	/**
	 * @param {string} text
	 */
	clean(text) {
		if (typeof (text) == 'string')
			return text
				.replace(token, '*TOKEN*')
				.replace(osuApiKey, '*OSUAPIKEY*')
				.replace(discordBotsToken, '*DISCORDBOTSTOKEN*');
		else
			return text;
	}
	/**
	 * @param {string} string 
	 */
	reverseString(string) {
		var splitString = string.split('');
		var reverseArray = splitString.reverse();
		var joinArray = reverseArray.join('');
		return joinArray;
	}
	/**
	 * @param {GuildMember} user
	 */
	userInfo(user) {
		if (user.presence.status == 'online') user.presence.status = 'Online';
		else if (user.presence.status == 'dnd') user.presence.status = 'Do Not Disturb';
		else if (user.presence.status == 'idle') user.presence.status = 'AFK';
		else if (user.presence.status == 'offline') user.presence.status = 'Offline/Disconnected';
		if (user.presence.game == null) user.presence.game = {
			name: '*null*',
			streaming: false,
			type: 0,
			url: null
		};
		return new discord.RichEmbed()
			.setDescription(`${user.user.username} info`)
			.setColor([255, 0, 0])
			.addField('Full Username', user.user.tag, true)
			.addField('ID', user.id, true)
			.addField('Roles', '**Hoist:** ' + user.hoistRole + '\n' +
			'**Highest:** ' + user.highestRole + '\n' +
			'**Color:** ' + user.colorRole, true)
			.addField('Presence', '**Playing:** ' + user.presence.game.name + '\n' +
			'**Streaming:** ' + user.presence.game.streaming + '\n' +
			'**Status:** ' + user.presence.status, true)
			.addField('Created at', user.user.createdAt.toUTCString(), true)
			.addField('Joined at', user.joinedAt.toUTCString(), true)
			.addField('Bot', user.user.bot, true)
			.addField('Avatar', '**Avatar Hash:** ' + user.user.avatar + '\n' +
			'**AvatarURL:** ' + user.user.displayAvatarURL, true)
			.setAuthor(user.user.username, user.user.displayAvatarURL)
			.setThumbnail(user.user.displayAvatarURL);
	}
	/**
	 * Fixes decimals to 2 decimals
	 * @param {number} number
	 * @returns {string} 
	 */
	fixDecimals(number) {
		return parseFloat(number).toFixed(2);
	}
	/**
	 * Returns the RichEmbed for beatmap command.
	 * @param {Beatmap[]} beatmap
	 */
	osuBeatmap(beatmap) {
		var bm = beatmap[0];
		if (bm.approved == -2) bm.approved = 'Graveyard';
		else if (bm.approved == -1) bm.approved = 'WIP';
		else if (bm.approved == 0) bm.approved = 'Pending';
		else if (bm.approved == 1) bm.approved = 'Ranked';
		else if (bm.approved == 2) bm.approved = 'Approved';
		else if (bm.approved == 3) bm.approved = 'Qualified';
		else if (bm.approved == 4) bm.approved = 'Loved';
		if (bm.approved_date == null) bm.approved_date = '*null*';
		if (bm.source == '' || bm.source == null) bm.source = '*null*';
		if (bm.tags == '' || bm.tags == null) bm.tags = '*null*';
		if (bm.artist == '' || bm.artist == null) bm.artist = '*null*';

		return new discord.RichEmbed()
			.setColor([255, 58, 255])
			.setThumbnail('https://b.ppy.sh/thumb/' + bm.beatmapset_id + 'l.jpg')
			.setTitle('osu!Beatmap')
			.addField('Basic', '**Artist:** ' + bm.artist + '\n' +
			'**Title:** ' + bm.title + '\n' +
			'**Creator:** ' + bm.creator + '\n' +
			'**Difficulty Name:** ' + bm.version + '\n' +
			'**Source:** ' + bm.source + '\n' +
			'**BPM:** ' + bm.bpm + '\n' +
			'**Max Combo:** ' + bm.max_combo + 'x\n' +
			'**Status:** ' + bm.approved, true)
			.addField('Difficulty', '**Stars:** ' + this.fixDecimals(bm.difficultyrating) + '*\n' +
			'**HP:** ' + bm.diff_drain + '\n' +
			'**OD:** ' + bm.diff_overall + '\n' +
			'**AR:** ' + bm.diff_approach + '\n' +
			'**CS:** ' + bm.diff_size, true)
			.addField('IDs', '**BeatmapSet:** ' + bm.beatmap_id + '\n' +
			'**Beatmap:** ' + bm.beatmap_id, true)
			.addField('Links', '[**Beatmap Set**](https://osu.ppy.sh/s/' + bm.beatmapset_id + ')\n' +
			'[**Beatmap**](https://osu.ppy.sh/b/' + bm.beatmap_id + ')\n' +
			'[**Download Beatmap Set**](https://osu.ppy.sh/d/' + bm.beatmapset_id + ')', true);
	}
	/**
	 * Returns the RichEmbed for user best commands.
	 * @param {Best[]} playF 
	 */
	osuBest(playF) {
		var play = playF[0];
		if (play.rank == 'S') play.rank = 'S (Gold)';
		if (play.rank == 'SH') play.rank = 'S (Silver)';
		if (play.rank == 'X') play.rank = 'SS (Gold)';
		if (play.rank == 'XH') play.rank = 'SS (Silver)';
		return new discord.RichEmbed()
			.setColor([255, 58, 255])
			.addField('BeatmapID', play.beatmap_id, true)
			.addField('Score', play.score, true)
			.addField('Count Notes', '**300:** ' + play.count300 + '\n' +
			'**100:** ' + play.count100 + '\n' +
			'**50:** ' + play.count50 + '\n' +
			'**Misses:** ' + play.countmiss, true)
			.addField('Combo', play.maxcombo, true)
			.addField('Date', play.date, true)
			.addField('PP', play.pp, true)
			.addField('Rank', play.rank, true)
			.addField('Links', '[**Beatmap**](https://osu.ppy.sh/b/' + play.beatmap_id + ')\n' +
			'[**User**](https://osu.ppy.sh/u/' + play.user_id + ')', true)
	}
	/**
	 * Returns the RichEmbed for user commands.
	 * @param {User[]} userF 
	 * @returns {RichEmbed} 
	 */
	osuUser(userF) {
		var user = userF[0];
		return new discord.RichEmbed()
			.setColor([255, 58, 255])
			.setAuthor(user.username, 'https://a.ppy.sh/' + user.user_id)
			.setThumbnail('https://a.ppy.sh/' + user.user_id)
			.addField('General', '**ID:** ' + user.user_id + '\n' +
			'**Country:** ' + user.country + '\n' +
			'**PP:** ' + user.pp_raw + '\n' +
			'**Level:** ' + user.level + '\n' +
			'**Accuracy:** ' + this.fixDecimals(user.accuracy) + '%\n' +
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
			'[**Avatar**](https://a.ppy.sh/' + user.user_id + ')', true);
	}
	/**
	 * 
	 * @param {VoiceConnection} connection 
	 * @param {Message} msg 
	 */
	play(connection, msg) {
		var server = servers[msg.guild.id];

		server.dispatcher = connection.playStream(yt(server.queue[0], { filter: 'audioonly' }));
		server.queue.shift();
		server.dispatcher.on('end', () => {
			if (server.queue[0]) {
				play(connection, msg);
			} else {
				connection.disconnect();
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setDescription('I left voice channel because the queue is empty'));
			}
		});
	}
}

exports.Functions = Functions;
