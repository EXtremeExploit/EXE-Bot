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
class rate {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		const rate = Math.floor(Math.random() * 11);
		if (!args == '' || !args == null) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setTitle('Rate')
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
				.setDescription('I\'d rate ' + args + ' a: ' + rate));
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#random) for help!')
				.setDescription('Please specify something to rate!'));
		}
	}
}
module.exports = rate;
