import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		msg.channel.send(new discord.MessageEmbed()
			.setTitle(`Pinging...`)
			.setColor([0, 0, 255])).then((pingMsg) => {
				pingMsg.edit(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Pong!`)
					.setTimestamp(new Date())
					.addField(`Bot`, `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
					.addField(`WebSocket`, `**${client.ws.ping}ms.**`, true));
			});
	}
}