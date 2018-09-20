const main = require('../commands').Main;
const data = main.getData();
const discord = require('discord.js');
const { Message, Client } = discord;
class disconnect {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		if (msg.member.user.id == data.owner().id) {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(client.user.username, client.user.avatarURL)
				.setDescription('Disconnecting...')
				.setTitle('Disconnect')).then(() => {
					client.destroy();
				}).then(() => {
					process.exit();
				});
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setDescription('Bot owner only!')
				.setFooter('how did you found this command?')
			);
		}
	}
}
module.exports = disconnect;
