import discord from 'discord.js';
import { SocialModel, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		SocialModel.findOne({ id: msg.author.id }, (err, social: SocialClass) => {
			if (social == null)
				social = createProfile(msg.author.id);

			social = SocialCheckUndefineds(social);

			social.set('owos', social.owos += 1);
			social.save();

			msg.channel.send(new discord.MessageEmbed()
				.setTitle(`${msg.member.user.username} Just ÒwÓ'd, He went OwO ${social.owos} times`)
				.setColor([255, 0, 0]));
		});
	}
}
