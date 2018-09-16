const main = require('../commands').Main;
const functions = main.getFunctions();
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
class reverse {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (!args == '' || args == null) {
			var reversedText = functions.reverseString(args);
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
				.setDescription(reversedText)
				.setTitle('Reverse'));
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
				.setDescription('Please specify something to reverse!'));
		}
	}
}
module.exports = reverse;
