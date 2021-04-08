import discord from 'discord.js';
import { CoinflipResults, SocialModel, Badges, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();
let db = new config().GetDB();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		SocialModel.findOne({
			id: msg.author.id
		}, (err, social: SocialClass) => {
			if (err) throw err;

			let result = this.FlipCoin();

			switch (result) {
				case CoinflipResults.Head:
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setTitle(`Coin flip!`)
						.setDescription(`I flipped a coin and it landed on **heads**.`));
					break;
				case CoinflipResults.Tails:
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setTitle(`Coin flip!`)
						.setDescription(`I flipped a coin and it landed on **tails**.`));
					break;
				case CoinflipResults.Edge:
					msg.channel.send(new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(msg.member.user.username, msg.member.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
						.setTitle(`Coin flip!`)
						.setDescription(`I flipped a coin and it landed on.... THE EDGE!!!`));
					break;
			}

			if (social == null) {
				social = createProfile(msg.author.id);
			}

			social = SocialCheckUndefineds(social);

			social.set('coinflips', {
				heads: ((result == CoinflipResults.Head) ? social.coinflips.heads + 1 : social.coinflips.heads),
				tails: ((result == CoinflipResults.Tails) ? social.coinflips.tails + 1 : social.coinflips.tails),
				edges: ((result == CoinflipResults.Edge) ? social.coinflips.edges + 1 : social.coinflips.edges),
			});

			let total = social.coinflips.heads + social.coinflips.tails + social.coinflips.edges;

			//Coinflipper badges
			if (total >= 1000 && social.badges[Badges.Coinflipper1K] == 0) social.badges.set(Badges.Coinflipper1K, 1);
			if (total >= 10000 && social.badges[Badges.Coinflipper10K] == 0) social.badges.set(Badges.Coinflipper10K, 1);
			if (total >= 100000 && social.badges[Badges.Coinflipper100K] == 0) social.badges.set(Badges.Coinflipper100K, 1);
			if (total >= 1000000 && social.badges[Badges.Coinflipper1M] == 0) social.badges.set(Badges.Coinflipper1M, 1);

			//Coinflip Edge badge
			if (social.coinflips.edges >= 1 && social.badges[Badges.CoinflipEdge] == 0) social.badges.set(Badges.CoinflipEdge, 1);
			social.save();
		});
	}

	FlipCoin() {
		let max = 6000; //1 in x
		//https://ui.adsabs.harvard.edu/abs/1993PhRvE..48.2547M/abstract
		
		let rng = Math.floor(Math.random() * (max - 0 + 1) + 0);
		
		if (rng < max / 2) {
			return CoinflipResults.Head; // 0-49 (50%)

		} else if (rng > max / 2) {
			return CoinflipResults.Tails; // 51-100 (50%)

		} else if (rng == max / 2) {
			return CoinflipResults.Edge; // 50 (1%)
		}
	}
}
