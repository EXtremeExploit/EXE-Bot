const discord = require('discord.js');
const { Message, Client } = discord;
class uptime {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var miliseconds = client.uptime % 1000;
		var seconds = Math.floor(client.uptime / 1000) % 60;
		var minutes = Math.floor(Math.floor(client.uptime / 1000) / 60) % 60;
		var hours = Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) % 24;
		var days = Math.floor(Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) / 24);
		msg.channel.send(new discord.RichEmbed()
			.setColor([255, 0, 0])
			.setAuthor(client.user.username, client.user.avatarURL)
			.addField('Days', days)
			.addField('Hours', hours)
			.addField('Minutes', minutes)
			.addField('Seconds', seconds)
			.addField('Miliseconds', miliseconds));
	}
}
module.exports = uptime;
