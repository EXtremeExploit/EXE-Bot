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
		let social: SocialClass = await SocialModel.findOne({ id: this.int.user.id });
		if (social == null)
			social = createProfile(this.int.user.id);

		social = SocialCheckUndefineds(social);

		social.set('owos', ++social.owos);

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} Just ÒwÓ'd, He went OwO ${social.owos} times`)
				.setColor([255, 0, 0])]
		});

		await social.save();

		return true;
	}
}
