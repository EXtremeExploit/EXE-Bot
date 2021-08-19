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
		const user = this.int.options.getMember('user') as discord.GuildMember;

		if (user.id == this.int.user.id) {
			this.int.reply({
				embeds: [new discord.MessageEmbed()
					.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
					.setColor([255, 0, 0])
					.setDescription('You can\'t kill youself, No good man')]
			});
			return false;
		}

		let KilledSocial: SocialClass = await SocialModel.findOne({ id: user.id });
		let KillerSocial: SocialClass = await SocialModel.findOne({ id: this.int.user.id });
		if (KillerSocial == null) {
			KillerSocial = createProfile(this.int.user.id);
		}
		if (KilledSocial == null) {
			KilledSocial = createProfile(user.id);
		}

		KillerSocial = SocialCheckUndefineds(KillerSocial);
		KilledSocial = SocialCheckUndefineds(KilledSocial);

		KillerSocial.set('kills', ++KillerSocial.kills);
		KilledSocial.set('deaths', ++KilledSocial.deaths);

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${this.int.user.username} has killed ${user.user.username}`)
				.setColor([0, 0, 255])]
		});

		await KillerSocial.save();
		await KilledSocial.save();

		return true;
	}
}
