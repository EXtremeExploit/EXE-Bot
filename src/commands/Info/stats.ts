import discord from 'discord.js';
import * as mongoose from 'mongoose';
import { CookieModel, SandwichModel } from '../../util.js';
import config from '../../config.js'
let db = new config().GetDB();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		((mongoose as any).default as mongoose.Mongoose).connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).catch((e) => new Error(e));

		let user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);

		SandwichModel.findOne({
			id: user.valueOf()
		}, (err, sandwich: any) => {
			if (err) throw err;

			CookieModel.findOne({
				id: user.valueOf()
			}, (err, cookie: any) => {
				if (err) throw err;

				let cookies = (cookie == null) ? (`This user doesn\`t have cookies :(`) : (cookie.count);
				let sandwiches = (sandwich == null) ? (`This user doesn\`t have sandwiches :(`) : (sandwich.count);

				msg.channel.send(new discord.MessageEmbed()
					.setColor([0, 0, 255])
					.setDescription(`Stats from ${user.user.username}`)
					.addField(`Food`,
						`**Cookies:** ${cookies}\n` +
						`**Sandwiches:** ${sandwiches}`)
					.setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
			});
		});
	}
}