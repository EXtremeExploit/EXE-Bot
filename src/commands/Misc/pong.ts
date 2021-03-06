import { Client, Message } from "discord.js";
import discord from 'discord.js';

export default class {
	constructor(client: Client, msg: Message) {
		msg.channel.send(new discord.MessageEmbed()
			.setTitle(`Ponging...`)
			.setColor([0, 0, 255])).then((pingMsg) => {
				pingMsg.edit(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Ping!`)
					.setTimestamp(new Date())
					.addField(`Bot`, `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
					.addField(`WebSocket`, `**${client.ws.ping}ms.**`, true));
			});
	}
}