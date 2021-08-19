import discord from 'discord.js';
import { SocialModel, Badges, createProfile, SocialCheckUndefineds, SocialClass } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		let social: SocialClass = await SocialModel.findOne({
			id: this.int.user.id
		});

		if (social == null)
			social = createProfile(this.int.user.id);

		SocialCheckUndefineds(social);

		if (social.workName == '') {
			this.int.reply('It seems that you don\'t have a job jet, get one with /setjob');
			return;
		}

		const moneyMade = (Math.floor(Math.random() * 45)) + 5;
		const money = social.money;
		social.set('money', social.money += moneyMade);

		const workCount = social.workCount;
		social.set('workCount', ++social.workCount);

		const workName = social.workName;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setColor(0x008f18)
				.setTitle(`${this.int.user.username} Worked as ${workName}`)
				.addField('Money', `${money} -> ${money + moneyMade} (+${moneyMade})`)
				.addField('Work Count', `${workCount} -> ${workCount + 1} (+1)`)]
		});

		if (money + moneyMade >= 1000000 && social.badges[Badges.Rich] != 1)
			social.badges.set(Badges.Rich, 1);

		await social.save();
		return true;
	}
}

