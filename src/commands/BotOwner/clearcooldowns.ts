import discord from 'discord.js';
import config from '../../config.js';
let owner = new config().GetOwner();


export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		if (msg.member.user.id == owner.id) {
			let memory = new config().GetMemory();
			memory.cooldown = [];
			new config().WriteMemory(memory);
			msg.reply('Cooldowns cleared');
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.setDescription(`Bot owner only!`)
				.setFooter(`how did you found this command?`)
			);
		}
	}
}