import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let user = msg.guild.member(msg.content.split(` `).slice(1).join(` `)).user;

		msg.channel.send(new discord.MessageEmbed()
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setColor([255, 0, 0])
			.setURL(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setTitle(`URL`)
			.setDescription(`${user.username}'s Avatar`));
	}
}