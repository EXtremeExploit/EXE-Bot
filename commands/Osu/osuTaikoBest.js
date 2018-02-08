const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
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
const { Beatmap, Best, GamesOptions, Match, MatchOptions, Recent, Replay, Scores, ScoresOptions, User, UserEvents } = _osuapi;
//#endregion
class osuTaikoBest {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
        var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var args = messageArray.slice(1).join(' ');
		var command = command_prefix.replace(prefix, '');
		
		if (args == '' || args == null) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
				.setDescription('Pleace specify an username!'));
		} else {
			osuApi.getUserBest({
				u: args,
				m: 1,
				limit: 1,
				type: 'string'
			}).then(playF => {
				msg.channel.send(functions.osuBest(playF))
			})
				.catch(err => {
					console.log(err);
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setTitle('Error')
						.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
						.setDescription('User does not exists or doesnt have any play in your search!')
						.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
				});
		}
	}
}
module.exports = osuTaikoBest;
