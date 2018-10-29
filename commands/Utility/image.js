const main = require('../commands').Main;
const data = main.getData();
var google = data.google();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};
const _gimages = require('google-images');
const gimages = new _gimages(google.cseID, google.appApiKey);

const firstemoji = '⏮';
const backemoji = '◀';
const nextemoji = '▶';
const lastemoji = '⏭';
const stopemoji = '⏹';

const discord = require('discord.js');
const { Message, Client } = discord;
class image {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (args == '') {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
				.setDescription('Please specify a search term!'));
		} else {
			gimages.search(args, {
				safe: 'medium'
			}).then((images) => {
				if (images.length == 0) {
					msg.channel.send(new discord.RichEmbed()
						.setAuthor(msg.author.username, msg.author.displayAvatarURL)
						.setColor([255, 0, 0])
						.setTitle('Error')
						.setDescription('• Could not find any image on your search'));
					return;
				}
				var index = 0;
				var embed = new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.setDescription('Displaying ' + index + 1 + '/' + images.length + ' Images')
					.setURL(images[index].url)
					.setTitle('Google Image Search')
					.setImage(images[index].url)
					.setFooter('Getting reactions');

				msg.channel.send(embed).then(async (message) => {
					await this.reactButtons(message);

					const collector = message.createReactionCollector((reaction, user) => user.id != client.user.id,
						{
							time: 60000
						});

					collector.on('collect', async (reaction, reactions) => {
						if (reaction.count >= 2) {
							if (reaction.emoji.name == firstemoji) {
								index = 0;
								embed = new discord.RichEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL)
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.clearReactions();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == lastemoji) {
								index = (images.length - 1);
								embed = new discord.RichEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL)
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.clearReactions();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == stopemoji) {
								collector.stop('User requested');
							}
							if (reaction.emoji.name == backemoji) {
								if (index == 0) index = index + 1;
								index = (index - 1);
								embed = new discord.RichEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL)
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.clearReactions();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == nextemoji) {
								if (index == 9) index = index - 1;
								index = (index + 1);
								embed = new discord.RichEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL)
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.clearReactions();

								await this.reactButtons(message);
							}
						}
					});
					collector.on('end', (coll, reason) => {
						message.edit(embed.setFooter('Stopped getting reactions'));
					});
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
				msg.channel.send(new discord.RichEmbed()
					.setColor([255, 0, 0])
					.setTitle('Error')
					.addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
					.setDescription('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!')
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));

			});
		}
	}
	async reactButtons(message) {
		await message.react(firstemoji);
		await message.react(backemoji);
		await message.react(nextemoji);
		await message.react(lastemoji);
		await message.react(stopemoji);
	}
}
module.exports = image;
