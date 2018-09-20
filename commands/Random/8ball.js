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
class eightball {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		var response = [
			'Nope',
			'Yes',
			'Of Course',
			'Never',
			'Not looking so good...',
			'Concentrate and ask again',
			'Yes, definitely',
			'Better not tell you now'
		];
		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([0, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#random) for help!')
				.setDescription('Please specify an ask!'));
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([0, 0, 0])
				.setTitle('8ball')
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
				.setDescription(response[Math.floor(Math.random() * response.length)]));
		}
	}
}
module.exports = eightball;
