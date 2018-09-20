const main = require('../commands').Main;
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
class wiki {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		
		if (wikis.isEnabled) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(client.user.username, client.user.avatarURL)
				.addField('Wikis', '**Home:** ' + wikis.home + '\n' +
				'**Commands:** ' + wikis.commands + '\n' +
				'**Replies:** ' + wikis.replies + '\n' +
				'**FAQ:** ' + wikis.faq)
				.setFooter('Wikis hosted by Github'));
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setDescription('This Bot doesn\'t Support wikis'));
		}
	}
}
module.exports = wiki;
