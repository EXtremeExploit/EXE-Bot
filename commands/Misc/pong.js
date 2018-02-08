const main = require('../index').Main;
const functions = main.getFunctions();
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
class pong {
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
		
		msg.channel.send(new discord.RichEmbed()
			.setTitle('Pinging...')
			.setColor([0, 0, 255])).then(pingMsg => {
				pingMsg.edit(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle('Ping!')
					.addField('Bot', `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
					.addField('API', `**${client.ping}ms.**`, true));
			});
	}
}
module.exports = pong;
