const main = require('../../commands').Main;
const data = main.getData();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class fortnite {
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
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#games) for help!')
				.setDescription('Please specify an username!'));
		} else {
			//#region Mode
			var mode = null;
			if (msg.content.includes('--pc')) mode = 'pc';
			if (msg.content.includes('--xbox')) mode = 'xbl';
			if (msg.content.includes('--psn')) mode = 'psn';
			if (mode == null) mode = 'pc';
			//#endregion

			//#region User
			var user;
			user = msg.content.substring(command_prefix.length, msg.content.length)
				.replace('--pc', '')
				.replace('--xbox', '')
				.replace('--psn', '').trim();
			//#endregion
			//
			var _fortnite = require('fortnite.js');
			var fortnite = new _fortnite(data.fortnite());
			fortnite.get(user, mode).then((e) => {
				var accountId = e.accountId;
				var displayName = e.displayName;

				var solo = {
					wins: e.solo.top1.value,
					kd: e.solo.kd.value,
					winratio: e.solo.winRatio.value,
					matches: e.solo.matches.value,
					kills: e.solo.kills.value
				};
				var duo = {
					wins: e.duo.top1.value,
					kd: e.duo.kd.value,
					winratio: e.duo.winRatio.value,
					matches: e.duo.matches.value,
					kills: e.duo.kills.value
				};
				var squad = {
					wins: e.squad.top1.value,
					kd: e.squad.kd.value,
					winratio: e.squad.winRatio.value,
					matches: e.squad.matches.value,
					kills: e.squad.kills.value
				};
				var global = {
					score: e.stats.score,
					matches: e.stats.matches,
					top1: e.stats.top1,
					winpercent: e.stats.winPercent,
					kills: e.stats.kills,
					kd: e.stats.kd
				};

				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle(displayName + ' Fortnite Stats')
					.setFooter('https://fortnitetracker.com/')
					.addField('General', '**Score:** ' + global.score + '\n' +
						'**Matches:** ' + global.matches + '\n' +
						'**Wins:** ' + global.top1 + ' (' + global.winpercent + ')\n' +
						'**Kills:** ' + global.kills + '\n' +
						'**K/d:** ' + global.kd + '\n' +
						'**Account-ID:** ' + accountId, true)
					.addField('Solo', '**Wins:** ' + solo.wins + ' (' + solo.winratio + '%)\n' +
						'**Matches:** ' + solo.matches + '\n' +
						'**Kills:** ' + solo.kills + '\n' +
						'**K/d:** ' + solo.kd, true)
					.addField('Duo', '**Wins:** ' + solo.wins + ' (' + duo.winratio + '%)\n' +
						'**Matches:** ' + duo.matches + '\n' +
						'**Kills:** ' + duo.kills + '\n' +
						'**K/d:** ' + duo.kd, true)
					.addField('Squad', '**Wins:** ' + squad.wins + ' (' + squad.winratio + '%)\n' +
						'**Matches:** ' + squad.matches + '\n' +
						'**Kills:** ' + squad.kills + '\n' +
						'**K/d:** ' + squad.kd, true)
					.setAuthor(msg.author.username, msg.author.displayAvatarURL));

			}).catch((err) => {
				if (err == 'HTTP Player Not Found') {
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setTitle('Error')
						.addField('Help', 'Check the [wiki](' + wikis.commands + '#fortnite) for help!')
						.setDescription('**Can be for the possible reasons:** \n' +
							'User does not exists \n' +
							'You entered the wrong modifiers')
						.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
				} else {
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setTitle('Error')
						.addField('Help', 'Check the [wiki](' + wikis.commands + '#fortnite) for help!')
						.setDescription('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!')
						.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
					console.log(err);
				}
			});

		}
	}
}
module.exports = fortnite;
