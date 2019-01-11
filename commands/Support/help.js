const main = require('../commands').Main;
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;

class help {
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} msg 
	 */
	constructor(client, msg) {
		var messageArray = msg.content.split(' ');
		var command_prefix = messageArray[0];
		var command = command_prefix.replace(prefix, '');

		var commands = main.helpGenerator();

		if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;
		if (!command_prefix.startsWith(prefix)) return;
		switch (command) {
			case 'help':
				//#region Embed Setup
				var embed = new discord.RichEmbed()
					.setColor([0, 0, 255])
					.setThumbnail(client.user.avatarURL)
					.setTitle(`${client.user.username} Commands`);
				//#endregion

				//#region Wiki
				if (data.commands().categories.Wiki == true || data.commands().categories.Wiki == 'true') {
					embed.addField('Wiki', commands.wiki, true);
				}
				//#endregion

				//#region No Commands
				if (!data.commands().categories.Wiki == true) {
					embed.setDescription('I don\'t have any commands...')
						.setFooter('Commands? what is that?');
				}
				msg.channel.send(embed);
				break;
		}
	}
}
//#endregion

module.exports = help;
