import discord from 'discord.js';
import { forSite } from 'booru';
let r34 = forSite('rule34.xxx');

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if ((msg.channel as discord.TextChannel).nsfw) {
			try {
				let query = msg.content.split(` `).slice(1).join(` `);
				r34.search(query, { limit: 1000, random: true }).then((posts) => {
					if (posts.length == 0) {
						msg.channel.send(`Sorry, I didn't find anything about \`\`${query}\`\`.`);
					} else {
						let post = posts[Math.floor(Math.random() * posts.length)];
						let link = post.fileUrl;
						msg.channel.send(new discord.MessageEmbed()
							.setColor([255, 0, 0])
							.setTitle(`Rule34`)
							.setURL(post.postView)
							.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
							.setImage(link)
							.setDescription(`You Searched: \`${query}\``));
					}
				}).catch((err) => {
					throw err;
				});
			} catch (err) {
				throw err;
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