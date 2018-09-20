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
class emoji {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		var name = args.replace(':', '');
		var emojiname = name.substring(1, name.indexOf(':'));
		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL)
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
				.setDescription('Please specify an emoji to get!'));
		} else {
			var emote = msg.guild.emojis.find('name', emojiname);
			if (emote == null) {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle('Error')
					.addField('Help', 'Check the [wiki](' + wikis.commands + '#info) for help!')
					.setDescription('Please insert a valid emoji, it needs to be an emoji from THIS server')
					.setAuthor(msg.author.username, msg.author.displayAvatarURL));
			} else {
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setThumbnail(emote.url)
					.setImage(emote.url)
					.addField('Emoji Info',
						'**ID:** ' + emote.id + '\n' +
						'**Identifier:** ' + emote.identifier + '\n' +
						'**Animated:** ' + emote.animated + '\n' +
						'**Name:** ' + emote.name + '\n' +
						'**URL:** ' + emote.url));
			}
		}
	}
}
module.exports = emoji;
