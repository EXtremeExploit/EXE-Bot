import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		msg.channel.send(`What's this?`);
	}
}