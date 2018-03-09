const main = require('../index').Main;
const functions = main.getFunctions();
main.getPrototypes();
var tools = main.getTools();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class dicksize {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var args = messageArray.slice(1).join(' ');
		var command = command_prefix.replace(prefix, '');

		let xsmall = [
			'Life hates you.',
			'Did you know that the ancient Greek considered small penises as a symbol of fertility?',
			'At least it won\'t get any smaller.'
		];

		let small = [
			'It\'s almost cute.',
			'Well... it could have been worse...',
			'I\'m sorry about that.'
		];

		let smedium = ['Seems like it\'s normal sized to me.',
			'The average.',
			'A decent size.'
		];

		let medium = ['You\'re slightly above the average.',
			'Good job.',
			'To be honest it\'s not that impressive.'
		];

		let large = ['My horse is jealous.',
			'This is something I would be proud of.',
			'Almost as long as my arm.'
		];

		let xlarge = ['Keep that thing away from me! D:',
			'You could knock down someone with that.',
			'Do you sometimes bang it on the ceiling?',
			'Don\'t trip over it.', 'Damn son.'
		];

		let int = msg.author.id.split('');
		let sum = 0;
		for (let i of int)
			sum += Number(i);
		let length = sum % 10 + 1;
		let str = '8';
		for (let i = 0; i < length; i++)
			str += '=';
		str += 'D';
		var txt = ':straight_ruler: | ' + str + ' (' + msg.member.displayed + ')';
		var embed = new discord.RichEmbed()
			.setAuthor(msg.author.username, msg.author.displayAvatarURL)
			.setTitle('Dick Size: ' + str + ' ('+length+')')
			.setColor([255, 0, 0]);
		if (length == 1) embed.setDescription(xsmall.random());
		else if (length <= 3) embed.setDescription(small.random());
		else if (length <= 5) embed.setDescription(smedium.random());
		else if (length <= 7) embed.setDescription(medium.random());
		else if (length <= 9) embed.setDescription(large.random());
		else if (length == 10) embed.setDescription(xlarge.random());

		msg.channel.send(embed);
	}
}
module.exports = dicksize;
