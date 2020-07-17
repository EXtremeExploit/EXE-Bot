import discord from 'discord.js';
import booru from 'booru';
let danbooru = booru.forSite('danbooru', '2hMmVCgPXoAezircc1GUsrVg');

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if ((msg.channel as discord.TextChannel).nsfw || (msg.channel as discord.GuildChannel).name.startsWith(`nsfw`)) {
			try {
				let query = msg.content.split(` `).slice(1).join(` `);
				danbooru.search(query, { limit: 1000, random: true }).then((posts) => {
					if (posts.length == 0) {
						msg.channel.send(`Sorry, I didn't find anything about \`\`${query}\`\`.`);
					} else {
						let post = posts[Math.floor(Math.random() * posts.length)];
						let link = post.fileUrl;
						msg.channel.send(new discord.MessageEmbed()
							.setColor([255, 0, 0])
							.setTitle(`Danbooru`)
							.setURL(post.postView)
							.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
							.setImage(link)
							.setDescription(`You Searched: \`${query}\``));
					}
				}).catch((err) => {
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle(`Danbooru Error`)
						.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setDescription(err.message));
				});
			} catch (err) {
				console.log(err);
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription(`An error ocurred!`)
					.setTitle(`Danbooru`)
					.addField(`Message Error`, err)
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setColor([255, 0, 0])
				.setTitle(`NSFW Error!`)
				.setDescription(`NSFW channels only!`));
		}
	}
}