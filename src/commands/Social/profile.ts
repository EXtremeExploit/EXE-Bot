import discord from 'discord.js';
import { SocialModel, GetStringFromBadges, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';

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

		let social: SocialClass = await SocialModel.findOne({ id: user.id });
		if (social == null)
			social = createProfile(user.id);

		social = SocialCheckUndefineds(social);

		let workText = '';
		if (social.workName == '')
			workText = `${social.alias == '' ? user.user.username : social.alias} Doesn't have a job`;
		else
			workText = `${social.alias == '' ? user.user.username : social.alias} works as ${social.workName}`;

		const badges = GetStringFromBadges(social.badges);
		const kd = social.kills / social.deaths;

		await this.int.reply({
			embeds: [new discord.MessageEmbed()
				.setTitle(`${social.alias == '' ? user.user.username : social.alias} Profile`)
				.setColor(0x0000FF)
				.setThumbnail(user.user.displayAvatarURL({ size: 1024 }))
				.setDescription(workText)
				.setAuthor(user.user.username, user.user.displayAvatarURL({ size: 1024 }))
				.addField('Info',
					`**Reputation:** ${social.rep} \n` +
					`**Kills:** ${social.kills} \n` +
					`**Deaths:** ${social.deaths} \n` +
					`**K/D:** ${kd}\n` +
					`**Cookies:** ${social.cookies} \n` +
					`**Sandwichs:** ${social.sandwichs}\n` +
					`**OwO's:** ${social.owos}`, true)
				.addField('Work',
					`**Money:** ${social.money}\n` +
					`**Profession:** ${social.workName}\n` +
					`**Work Count:** ${social.workCount}`, true)
				.addField('Badges', badges, true)
				.addField('Coinflips',
					`**Heads:** ${social.coinflips.heads}\n` +
					`**Tails:** ${social.coinflips.tails}\n` +
					`**Edges:** ${social.coinflips.edges}`)
				.setTimestamp(new Date)]
		});
		return true;
	}
}
