const main = require('../commands').Main;
const data = main.getData();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};
const shorten = require('isgd');

const discord = require('discord.js');
const { Message, Client } = discord;
class shorturl {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		//https://is.gd/exe_bot

		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
				.setDescription('Please specify something to short!'));
		} else {
			shorten.shorten(args, (res) => {
				if (res.startsWith('Error:')) {
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
						.setDescription('Please specify a valid URL to short!'));
				} else {
					msg.channel.send(res);
				}
			});
		}
	}
}

module.exports = shorturl;
