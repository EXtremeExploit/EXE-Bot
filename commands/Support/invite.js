const discord = require('discord.js');
const { Message, Client } = discord;
class invite {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		client.generateInvite(['SEND_MESSAGES', 'READ_MESSAGES',
			'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MANAGE_ROLES_OR_PERMISSIONS', 'MANAGE_CHANNELS',
			'EMBED_LINKS']).then((link) => {
				msg.channel.send(new discord.RichEmbed()
					.setTitle('Invite me to your server!')
					.setAuthor(client.user.username, client.user.displayAvatarURL)
					.setColor([255, 0, 0])
					.setDescription(link)
					.setURL(link));
			});
	}
}
module.exports = invite;
