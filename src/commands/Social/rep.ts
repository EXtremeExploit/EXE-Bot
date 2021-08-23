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
		let user = this.int.options.getMember('user') as discord.GuildMember;

		if (!user) user = this.int.member as discord.GuildMember;

		if (user.id == this.int.user.id) {
			await this.int.reply({
				content: 'You cant rep youself, that stuff doesn\'t grow from trees!!',
				ephemeral: true
			});
			return false;
		}

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} has given reputation to ${user.user.username}`)
				.setColor([0, 0, 255])]
		});

		let social: SocialClass = await SocialModel.findOne({ id: user.id });
		if (social == null)
			social = createProfile(user.id);

		social = SocialCheckUndefineds(social);

		social.set('rep', ++social.rep);
		await social.save();

		return true;
	}
}
