import discord from 'discord.js';
import { SocialModel, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';

export default class {
	client: discord.Client;
	msg: discord.Message;
	constructor(client: discord.Client, msg: discord.Message) {
		this.client = client;
		this.msg = msg;
	}

	async init() {
		let args = this.msg.content.split(` `).slice(1).join(` `);
		if (args.length < 2) {
			this.msg.reply('Your alias can\'t be less than 2 characteres long');
			return;
		}

		let social: SocialClass = await SocialModel.findOne({
			id: this.msg.author.id
		})

		if (social == undefined)
			social = createProfile(this.msg.author.id);

		social = SocialCheckUndefineds(social);

		social.set('alias', args);
		social.save();

		this.msg.channel.send(new discord.MessageEmbed()
			.setTitle(`${this.msg.member.user.username} is now recognized as ${social.alias}`)
			.setColor([255, 0, 0]));
		return true;
	}
}