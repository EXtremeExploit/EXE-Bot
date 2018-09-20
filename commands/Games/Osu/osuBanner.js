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
class osuBanner {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
				.setDescription('Please specify an username!'));
		} else {
			//#region Mode
			var mode;
			if (msg.content.includes('--std')) mode = 0;
			if (msg.content.includes('--taiko')) mode = 1;
			if (msg.content.includes('--ctb')) mode = 2;
			if (msg.content.includes('--mania')) mode = 3;
			//#endregion

			//#region User
			var user;
			user = args
				.replace('--std', '')
				.replace('--taiko', '')
				.replace('--ctb', '')
				.replace('--mania', '').trim();
			if (user == '' || user == null || user == undefined) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.addField('Help', 'Check the [wiki](' + wikis.commands + '#osu) for help!')
					.setDescription('Please specify an username!'));
				return;
			}
			//#endregion
			var url;
			switch (mode) {
				case 0:
					url = 'http://lemmmy.pw/osusig/sig.php?colour=pink&pp=1&countryrank&removeavmargin&flagstroke&onlineindicator=undefined&xpbar&uname=' + user + '&mode=0';
					break;
				case 1:
					url = 'http://lemmmy.pw/osusig/sig.php?colour=pink&pp=1&countryrank&removeavmargin&flagstroke&onlineindicator=undefined&xpbar&uname=' + user + '&mode=1';
					break;
				case 2:
					url = 'http://lemmmy.pw/osusig/sig.php?colour=pink&pp=1&countryrank&removeavmargin&flagstroke&onlineindicator=undefined&xpbar&uname=' + user + '&mode=2';
					break;
				case 3:
					url = 'http://lemmmy.pw/osusig/sig.php?colour=pink&pp=1&countryrank&removeavmargin&flagstroke&onlineindicator=undefined&xpbar&uname=' + user + '&mode=3';
					break;
				default:
					url = 'http://lemmmy.pw/osusig/sig.php?colour=pink&pp=1&countryrank&removeavmargin&flagstroke&onlineindicator=undefined&xpbar&uname=' + user;
			}
			msg.channel.send(new discord.RichEmbed()
				.setColor([187, 17, 119])
				.setDescription('Osu! banner for ' + user)
				.setURL(url)
				.setTitle('osu!banner')
				.setFooter('Provided by https://lemmmy.pw/osusig/')
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.setImage(url));
		}
	}
}
module.exports = osuBanner;
