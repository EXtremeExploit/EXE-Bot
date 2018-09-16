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
class say {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (!args == '' || args == null) {
			if (msg.content.includes('@everyone') || msg.content.includes('@here')) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.setTitle('Say')
					.setDescription('You cannot mention @everyone or @here'));
			} else {
				msg.channel.send(args);
			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
				.setDescription('Please specify something to say!'));
		}
	}
}
module.exports = say;
