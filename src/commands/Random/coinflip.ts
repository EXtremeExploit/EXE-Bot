import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let max = 1e17;
		let rng = Math.random() * max;
		if (rng < max/2) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setTitle(`Coin flip!`)
				.setDescription(`I flipped a coin and it landed on **heads**.`));
		} else if (rng > max/2) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setTitle(`Coin flip!`)
				.setDescription(`I flipped a coin and it landed on **tails**.`));
		} else if (rng == max/2) {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
				.setTitle(`Coin flip!`)
				.setDescription(`I flipped a coin and it landed on.... THE EDGE!!!`));
		}
	}
}