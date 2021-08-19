import discord from 'discord.js';
import { createProfile, SocialModel, SocialClass, SocialCheckUndefineds } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const images = [
			'https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif',
			'http://i.giphy.com/E77F8BfvntOq4.gif',
			'https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986',
			'http://i.imgur.com/bYVl2.gif'
		];

		const cookieImg = images[Math.floor(Math.random() * images.length)];

		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (!user) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription('Please specify an user!')]
			});
			return false;
		}

		if (user.id == this.int.user.id) {
			await this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setColor([255, 0, 0])
					.setDescription('You cant give a cookie to youself, that stuff doesn\'t  grow from trees!!')]
			});
			return false;
		}

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} Has given a cookie to ${user.user.username}`)
				.setColor([255, 0, 0])
				.setImage(cookieImg)]
		});

		let social: SocialClass = await SocialModel.findOne({ id: user.id });
		if (social == null)
			social = createProfile(user.id);

		social = SocialCheckUndefineds(social);

		social.set('cookies', ++social.cookies);
		await social.save();
		return true;
	}
}
