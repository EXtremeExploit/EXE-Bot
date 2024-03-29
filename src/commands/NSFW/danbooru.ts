import discord from 'discord.js';
import { forSite } from 'booru';
const danbooru = forSite('danbooru');

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
				content: 'NSFW channels only!',
				ephemeral: true
			});
			return false;
		}

		const query = this.int.options.getString('query');
		const posts = await danbooru.search(query, { limit: 1000, random: true });
		if (posts.length == 0) {
			await this.int.reply(`Sorry, I didn't find anything about \`\`${query}\`\`.`);
		} else {
			const post = posts[Math.floor(Math.random() * posts.length)];
			const link = post.fileUrl;
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle('Danbooru')
					.setURL(post.postView)
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
					.setImage(link)
					.setDescription(`You Searched: \`${query}\``)]
			});
		}
		return true;
	}
}
