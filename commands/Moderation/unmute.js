const main = require('../commands').Main;
const data = main.getData();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class unmute {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		if (msg.member.hasPermission('MANAGE_ROLES') || msg.member.hasPermission('ADMINISTRATOR')) {
			if (msg.mentions.members.first()) {
				if (msg.member.user.id == msg.mentions.members.first().id) {
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setDescription('Why do you want to unmute yourself...?')
						.setTitle('Are you serious?'));
				} else {
					msg.channel.overwritePermissions(msg.mentions.members.first(), {
						SEND_MESSAGES: true
					}).then((channel) => {
						if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') == true) {
							channel.send(new discord.RichEmbed()
								.setColor([255, 0, 0])
								.setTitle('Unmuted')
								.setDescription('Succesfully unmuted: ' + msg.mentions.members.first().user.username));
						} else return;
					});
				}
			} else {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.addField('Help', 'Check the [wiki](' + wikis.commands + '#moderation) for help!')
					.setDescription('Please specify an user!'));

			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
				.setTitle('ERROR')
				.setDescription('You dont have permissions to run that command.')
				.setColor([255, 0, 0]));
		}
	}
}
module.exports = unmute;
