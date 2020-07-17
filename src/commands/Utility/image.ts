import discord from 'discord.js';
import config from '../../config.js';
import { sleep } from '../../util.js';
let wikis = new config().GetWikis();
let googleKeys = new config().GetGoogle();
import _gimages from 'google-images';
const gimages = new _gimages(googleKeys.cseID, googleKeys.appApiKey);

const firstemoji = '⏮';
const backemoji = '◀';
const nextemoji = '▶';
const lastemoji = '⏭';
const stopemoji = '⏹';


export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let messageArray = msg.content.split(' ');
		let args = messageArray.slice(1).join(' ');

		if (args == '') {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
				.setDescription('Please specify a search term!'));
		} else {
			gimages.search(args, {
				safe: 'medium',
			}).then((images) => {
				if (images.length == 0) {
					msg.channel.send(new discord.MessageEmbed()
						.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setColor([255, 0, 0])
						.setTitle('Error')
						.setDescription('• Could not find any image on your search'));
					return;
				}
				let index = 0;
				let embed = new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
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
								embed = new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.reactions.removeAll();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == lastemoji) {
								index = (images.length - 1);
								embed = new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.reactions.removeAll();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == stopemoji) {
								collector.stop('User requested');
							}
							if (reaction.emoji.name == backemoji) {
								if (index == 0) index = index + 1;
								index = (index - 1);
								embed = new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.reactions.removeAll();

								await this.reactButtons(message);
							}
							if (reaction.emoji.name == nextemoji) {
								if (index == 9) index = index - 1;
								index = (index + 1);
								embed = new discord.MessageEmbed()
									.setColor([255, 0, 0])
									.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
									.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
									.setURL(images[index].url)
									.setTitle('Google Image Search')
									.setImage(images[index].url)
									.setFooter('Getting reactions');
								await message.edit(embed);
								await message.reactions.removeAll();

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
			});
		}
	}
	async reactButtons(message) {
		await message.react(firstemoji);
		await sleep(750);
		await message.react(backemoji);
		await sleep(750);
		await message.react(nextemoji);
		await sleep(750);
		await message.react(lastemoji);
		await sleep(750);
		await message.react(stopemoji);
		await sleep(750);
	}
}