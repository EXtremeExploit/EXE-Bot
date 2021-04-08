import discord from 'discord.js';
import { SocialModel, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	client: discord.Client;
	msg: discord.Message;
	constructor(client: discord.Client, msg: discord.Message) {
		this.client = client;
		this.msg = msg;

	}
	async init() {
		if (this.msg.mentions.members.first()) {
			if (this.msg.mentions.members.first().id == this.msg.member.id) {
				this.msg.channel.send(new discord.MessageEmbed()
					.setAuthor(this.msg.author.username, this.msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
					.setColor([255, 0, 0])
					.setDescription(`You cant rep youself, that stuff doesn't  grow from trees!!`));
				return;
			} else {
				this.msg.channel.send(new discord.MessageEmbed()
					.setTitle(`${this.msg.member.user.username} has given reputation to ${this.msg.mentions.members.first().user.username}`)
					.setColor([0, 0, 255]));

				let social: SocialClass = await SocialModel.findOne({ id: this.msg.mentions.members.first().id });
				if (social == null)
					social = createProfile(this.msg.mentions.members.first().id);

				social = SocialCheckUndefineds(social);

				social.set('rep', social.rep += 1);
				social.save();

				return true;
			}

		} else {
			this.msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check \`${prefix}help rep\``)
				.setDescription(`Please specify an user!`));
		}
		return false;
	}
}