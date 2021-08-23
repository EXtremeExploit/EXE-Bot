import discord from 'discord.js';
import { SocialModel, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const images = [
			'https://pa1.narvii.com/6272/7beb194348fefb46bfdd519cb1ef0e530a621247_hq.gif',
			'https://i.imgur.com/325tm32.gif',
			'https://mayraissenpai.files.wordpress.com/2016/12/tumblr_m6krnt7ghk1qk46vzo1_500.gif?w=656',
			'https://78.media.tumblr.com/66405e70b83061ec312ba553eb577847/tumblr_n6k8kv9AK21r4kkpvo1_500.gif',
			'https://78.media.tumblr.com/c4ced24d4ffaba84b430a9faca23d206/tumblr_opnapuxv531vviqkjo1_500.gif',
			'https://i.pinimg.com/originals/c5/b6/94/c5b694dbce3e8662b01adb6771463aa1.gif'
		];

		const sandwichImg = images[Math.floor(Math.random() * images.length)];

		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (user.id == this.int.user.id) {
			await this.int.reply({
				content: 'You cant give a sandwich to youself, that stuff doesn\'t  grow from trees!!',
				ephemeral: true
			});
			return false;
		}

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} Has given a sandwich to ${user.user.username}`)
				.setColor([255, 0, 0])
				.setImage(sandwichImg)]
		});

		let social: SocialClass = await SocialModel.findOne({ id: user.id });
		if (social == undefined || social == null)
			social = createProfile(user.id);

		social = SocialCheckUndefineds(social);

		social.set('sandwichs', ++social.sandwichs);
		await social.save();
		return true;
	}
}
