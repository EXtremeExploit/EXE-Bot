import discord from 'discord.js';
import { forSite } from 'booru';
const rule34 = forSite('rule34.xxx');

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		if (!(this.int.channel as discord.TextChannel).nsfw) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setColor([255, 0, 0])
					.setTitle('NSFW Error!')
					.setDescription('NSFW channels only!')]
			});
			return false;
		}

		const query = this.int.options.getString('query');
		const posts = await rule34.search(query, { limit: 1000, random: true });
		if (posts.length == 0) {
			await this.int.reply(`Sorry, I didn't find anything about \`\`${query}\`\`.`);
		} else {
			const post = posts[Math.floor(Math.random() * posts.length)];
			const link = post.fileUrl;
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle('rule34.xxx')
					.setURL(post.postView)
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setImage(link)
					.setDescription(`You Searched: \`${query}\``)]
			});
		}
		return true;
	}
}
