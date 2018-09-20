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
class channel {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var channel = (msg.mentions.channels.first()) ? (msg.mentions.channels.first()) : (msg.channel);

		var ct = functions.convertMS(new Date() - channel.createdTimestamp);

		if (channel) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([0, 0, 255])
				.setTitle(channel.name)
				.addField('Name', channel.name)
				.addField('ID', channel.id)
				.addField('Calculated Position', channel.calculatedPosition + 1)
				.addField('Type', channel.type)
				.addField('Created At', channel.createdAt.getUTCFullYear() + '/' + (channel.createdAt.getUTCMonth() + 1) + '/' + channel.createdAt.getUTCDate() + ' @ ' + channel.createdAt.getUTCHours() + ':' + channel.createdAt.getUTCMinutes() + ':' + channel.createdAt.getUTCSeconds() + ' UTC (' + ct.days + ' days, ' + ct.hours + ' hours, ' + ct.minutes + ' minutes, ' + ct.seconds + ' seconds ago)'));
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
				.setDescription('Please specify a channel!'));
		}
	}
}
module.exports = channel;
