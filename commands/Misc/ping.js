const discord = require('discord.js');
const { Message, Client } = discord;
class ping {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		msg.channel.send(new discord.RichEmbed()
			.setTitle('Pinging...')
			.setColor([0, 0, 255])).then((pingMsg) => {
				pingMsg.edit(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle('Pong!')
					.addField('Bot', `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
					.addField('API', `**${client.ping}ms.**`, true));
			});
	}
}
module.exports = ping;
