import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		msg.reply(`Your waifu doesn't exists, sorry about that...`);
	}
}