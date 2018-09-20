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
class rps {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client
	 */
	constructor(msg, client) {

		var posibilities = ['rock', 'paper', 'scissors'];
		var pos1 = posibilities[Math.floor(Math.random() * posibilities.length)];
		var pos2 = posibilities[Math.floor(Math.random() * posibilities.length)];
		if (msg.mentions.members.first()) {
			if (msg.member.user.id == msg.mentions.members.first().id) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setDescription('Why do you want to play with yourself...?')
					.setTitle('Are you serious?'));
			} else {
				var embed = new discord.RichEmbed()
					.setTitle('Rock, Paper and Scissors!')
					.setColor([255, 0, 0])
					.addField('Results', '<@' + msg.author.id + '>(' + msg.author.username + '): **' + pos1 + '**\n' +
						'<@' + msg.mentions.members.first().id + '>(' + msg.mentions.members.first().user.username + '): **' + pos2 + '**');
				var res = this.result(pos1, pos2);
				if (res == -1) embed.addField('Winner', '<@' + msg.mentions.members.first().user.id + '>(' + msg.mentions.members.first().user.username + ') Won!');
				if (res == 0) embed.addField('Winner', 'Draw.... Nobody wins');
				if (res == 1) embed.addField('Winner', '<@' + msg.author.id + '>(' + msg.author.username + ') Wons!');
				msg.channel.send(embed);
			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
				.setDescription('Please specify an user!'));
		}
	}
	/**
	 * Defines if the author of the message won or not
	 * @param {string} pos1 
	 * @param {string} pos2 
	 */
	result(pos1, pos2) {

		/**
		  * -1 = Lose
		  * 0 = Draw
		  * 1 = Won
		  */
		if (pos1 == 'rock' && pos2 == 'rock')
			return 0;
		if (pos1 == 'rock' && pos2 == 'paper')
			return -1;
		if (pos1 == 'rock' && pos2 == 'scissors')
			return 1;
		if (pos1 == 'paper' && pos2 == 'rock')
			return 1;
		if (pos1 == 'paper' && pos2 == 'paper')
			return 0;
		if (pos1 == 'paper' && pos2 == 'scissors')
			return -1;
		if (pos1 == 'scissors' && pos2 == 'rock')
			return -1;
		if (pos1 == 'scissors' && pos2 == 'paper')
			return 1;
		if (pos1 == 'scissors' && pos2 == 'scissors')
			return 0;
	}
}
module.exports = rps;
