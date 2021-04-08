import discord from 'discord.js';
import config from '../../config.js';
import isgd from 'isgd';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(' ');
		let args = messageArray.slice(1).join(' ');

		//https://is.gd/exe_bot

		if (args == '') {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField('Help', `Check \`${prefix}help shorturl\``)
				.setDescription('Please specify something to short!'));
		} else {
			isgd.shorten(args, (res) => {
				if (res.startsWith('Error:')) {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.addField('Help', `Check \`${prefix}help shorturl\``)
						.setDescription('Please specify a valid URL to short!'));
				} else {
					msg.channel.send(res);
				}
			});
		}
	}
}