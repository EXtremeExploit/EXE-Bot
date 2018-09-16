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
class mute {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		if (msg.channel.permissionsFor(msg.guild.me).has('MANAGE_ROLES') == true) {
			if (msg.member.hasPermission('MANAGE_ROLES') || msg.member.hasPermission('ADMINISTRATOR')) {
				if (msg.mentions.members.first()) {
					if (msg.member.user.id == msg.mentions.members.first().id) {
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 0, 0])
							.setDescription('Why do you want to mute yourself...?')
							.setTitle('Are you serious?'));
					} else {
						if ((msg.mentions.members.first().id == client.user.id) && (!msg.content.includes('--force'))) {
							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 0, 0])
								.setTitle('If you mute me, im not gonna work on this channel, are you sure?')
								.setDescription('You \'ll need to unmute me manually whenever you want to use me :3')
								.addField('Yes', '`' + data.prefix() + 'mute <@Member> --force`')
								.addField('No', 'Ignore this'));
						} else {
							msg.channel.overwritePermissions(msg.mentions.members.first(), {
								SEND_MESSAGES: false
							}).then((channel) => {
								if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') == true) {
									channel.send(new discord.RichEmbed()
										.setColor([255, 0, 0])
										.setTitle('Muted')
										.setDescription('Succesfully muted: ' + msg.mentions.members.first().user.username));

									if (!msg.mentions.members.first().user.bot) {
										msg.mentions.members.first().send(new discord.RichEmbed()
											.setDescription('You got muted from ' + msg.guild.name)
											.setColor([255, 0, 0])
											.setTitle('Muted')
											.addField('Muted by', msg.member.user.tag)).catch((e) => {
												throw new Error(e);
											});
									}
								} else return;
							});
						}
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
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setDescription('**To do that i need any of the following permissions**\n' +
					' - Manage permissions on this channel\n' +
					' - Manage roles'));
		}
	}
}

module.exports = mute;
