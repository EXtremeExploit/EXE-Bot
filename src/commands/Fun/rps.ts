import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let posibilities = [`rock`, `paper`, `scissors`];
		let pos1 = posibilities[Math.floor(Math.random() * posibilities.length)];
		let pos2 = posibilities[Math.floor(Math.random() * posibilities.length)];
		if (msg.mentions.members.first()) {
			if (msg.member.user.id == msg.mentions.members.first().id) {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setDescription(`Why do you want to play with yourself...?`)
					.setTitle(`Are you serious?`));
			} else {
				let embed = new discord.MessageEmbed()
					.setTitle(`Rock, Paper and Scissors!`)
					.setColor([255, 0, 0])
					.addField(`Results`, `<@${msg.author.id}>: **${pos1}**\n` +
						`<@${msg.mentions.members.first().id}>: **${pos2}**`);
				let res = this.result(pos1, pos2);
				if (res == -1) embed.addField(`Winner`, `<@${msg.mentions.members.first().user.id}> Won!`);
				if (res == 0) embed.addField(`Winner`, `Draw....Nobody wins`);
				if (res == 1) embed.addField(`Winner`, `<@${msg.author.id}> Won!`);
				msg.channel.send(embed);
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
				.addField(`Help`, `Check the [wiki](${wikis.commands}#fun) for help!`)
				.setDescription(`Please specify an user!`));
		}
	}

	result(pos1, pos2) {
		/**
		  * -1 = Lose
		  * 0 = Draw
		  * 1 = Won
		  */
		if (pos1 == `rock` && pos2 == `rock`)
			return 0;
		if (pos1 == `rock` && pos2 == `paper`)
			return -1;
		if (pos1 == `rock` && pos2 == `scissors`)
			return 1;
		if (pos1 == `paper` && pos2 == `rock`)
			return 1;
		if (pos1 == `paper` && pos2 == `paper`)
			return 0;
		if (pos1 == `paper` && pos2 == `scissors`)
			return -1;
		if (pos1 == `scissors` && pos2 == `rock`)
			return -1;
		if (pos1 == `scissors` && pos2 == `paper`)
			return 1;
		if (pos1 == `scissors` && pos2 == `scissors`)
			return 0;
	}
}