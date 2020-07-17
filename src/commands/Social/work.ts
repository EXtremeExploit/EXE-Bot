import discord from 'discord.js';
import { SocialModel, Badges, createProfile, SocialCheckUndefineds, SocialClass } from '../../util.js';
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
		let social: SocialClass = await SocialModel.findOne({
			id: this.msg.author.id
		});

		if (social == null)
			social = createProfile(this.msg.author.id);

		SocialCheckUndefineds(social);

		if (social.workName == '') {
			this.msg.reply(`It seems that you don't have a job jet, get one with ${prefix}setjob`);
			return;
		}


		let moneyMade = (Math.floor(Math.random() * 45)) + 5;
		let money = social.money;
		social.set('money', social.money += moneyMade);

		let workCount = social.workCount;
		social.set('workCount', social.workCount += 1);

		let workName = social.workName;
		social.save();

		this.msg.channel.send(new discord.MessageEmbed()
			.setColor(0x008f18)
			.setTitle(`${this.msg.author.username} Worked as ${workName}`)
			.addField('Money', `${money} -> ${money + moneyMade} (+${moneyMade})`)
			.addField('Work Count', `${workCount} -> ${workCount + 1} (+1)`));

		if (money + moneyMade >= 1000000 && Badges.Rich != 1)
			social.badges.set(Badges.Rich, 1);


		social.save();
		return true;
	}
}

