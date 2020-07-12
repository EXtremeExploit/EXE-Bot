import discord from 'discord.js';
import * as mongoose from 'mongoose';
import { CookieModel, SandwichModel, CoinflipModel } from '../../util.js';
import config from '../../config.js'
let db = new config().GetDB();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		((mongoose as any).default as mongoose.Mongoose).connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).catch((e) => new Error(e));

		let user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);

		(async () => {
			//Food
			let sandwich: any = await SandwichModel.findOne({ id: user.valueOf() });
			let cookie: any = await CookieModel.findOne({ id: user.valueOf() });

			let cookies = (cookie == null) ? ('This user doesn\'t have cookies :(') : (cookie.count);
			let sandwiches = (sandwich == null) ? ('This user doesn\'t have sandwiches :(') : (sandwich.count);

			//Coinflips
			let coinflip: any = await CoinflipModel.findOne({ id: user.valueOf() });
			let coinflips = {
				heads: (coinflip == null || coinflip.heads == 0) ? ('This user hasn\'t landed on this side yet') : (coinflip.heads),
				tails: (coinflip == null || coinflip.tails == 0) ? ('This user hasn\'t landed on this side yet') : (coinflip.tails),
				edge: (coinflip == null || coinflip.edge == 0) ? ('This user hasn\'t landed on this side yet') : (coinflip.edge),
			}

			msg.channel.send(new discord.MessageEmbed()
				.setColor([0, 0, 255])
				.setDescription(`Stats from ${user.user.username}`)
				.addField(`Food`,
					`**Cookies:** ${cookies}\n` +
					`**Sandwiches:** ${sandwiches}`)
				.addField('Coinflips',
					`**Heads:** ${coinflips.heads}\n` +
					`**Tails:** ${coinflips.tails}\n` +
					`**Edge:** ${coinflips.edge}\n`)
				.setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));

		})();
	}
}