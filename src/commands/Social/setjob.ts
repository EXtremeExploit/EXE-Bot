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
		const job = this.int.options.getString('job');

		let updatetxt;
		let social: SocialClass = await SocialModel.findOne({
			id: this.int.user.id
		});
		if (social == undefined || social == null)
			social = createProfile(this.int.user.id);

		if (social.workName == '')
			updatetxt = `Started to work as ${job}`;
		else
			updatetxt = `Changed his work to ${job}`;

		social.set('workName', job);
		social = SocialCheckUndefineds(social);

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} ${updatetxt}`)
				.setColor([255, 0, 0])]
		});

		await social.save();

		return true;
	}
}
