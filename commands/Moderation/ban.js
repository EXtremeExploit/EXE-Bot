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
class ban {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		if (msg.member.hasPermission(['BAN_MEMBERS']) || msg.member.hasPermission(['ADMINISTRATOR'])) {
			if (msg.mentions.members.first()) {
				if (msg.member.user.id == msg.mentions.members.first().id) {
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setDescription('Why do you want to ban yourself...?')
						.setTitle('Are you serious?'));
				} else {
					if (msg.mentions.members.first().id == client.user.id) {
						msg.channel.send(new discord.RichEmbed()
							.setColor([255, 0, 0])
							.setDescription('WHY ME!!!???')
							.setTitle(';-;'));
					} else {
						if (msg.mentions.members.first().bannable) {
							msg.mentions.members.first().ban().then((member) => {
								msg.channel.send(new discord.RichEmbed()
									.setColor([255, 0, 0])
									.setTitle('Banned')
									.setDescription('Succesfully banned: ' + member.user.tag));
								if (member.user.bot) {
									return;
								} else {
									member.send(new discord.RichEmbed()
										.setDescription('You got banned from ' + msg.guild.name)
										.setColor([255, 0, 0])
										.setTitle('Banned')
										.addField('Banned by', msg.member.user.tag)).catch((e) => {
											throw new Error(e);
										});
								}
							});
						} else {
							msg.channel.send(new discord.RichEmbed()
								.setColor([255, 0, 0])
								.setTitle('Ban Error')
								.setDescription('I don\'t have permissions to do that'));
						}
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
	}
}
module.exports = ban;
