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
		const newAlias = this.int.options.getString('alias');

		let social: SocialClass = await SocialModel.findOne({
			id: this.int.user.id
		});

		if (social == undefined)
			social = createProfile(this.int.user.id);


		social.set('alias', newAlias ? newAlias : '');
		social = SocialCheckUndefineds(social);

		this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(social.alias ? `You are now recognized as ${social.alias}` : 'You now don\'t have an alias')
				.setColor([255, 0, 0])]
		});

		await social.save();

		return true;
	}
}
