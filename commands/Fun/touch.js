const discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { Message, Client } = discord;

class touch {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	// eslint-disable-next-line no-unused-vars
	constructor(msg, client) {
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.author.id) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setDescription('You touched yourself... OwO')
					.setAuthor(msg.author.username, msg.author.displayAvatarURL));
			} else {
				if (msg.mentions.members.first().id == client.user.id) {
					msg.channel.send(new discord.RichEmbed()
						.setAuthor(msg.author.user, msg.author.displayAvatarURL)
						.setDescription('Y-You touched MEE!!??, baka...')
						.setColor([255, 0, 0]));
				} else {
					msg.reply(' touched ' + msg.mentions.members.first()).then(async (message) => {
						if (msg.mentions.members.first().user.bot) {
							msg.channel.send('I can\'t touch bots...');
						} else {
							msg.mentions.members.first().send(msg.author.tag + ' touched you ( ͡° ͜ʖ ͡°)').catch(() => {
								return;
							});
						}
					});
				}
			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setAuthor(msg.member.user.username)
				.setDescription('You need to mention someone uwu')
				.setColor([255, 0, 0]));
		}
	}
}
module.exports = touch;
