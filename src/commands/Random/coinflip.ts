import discord from 'discord.js';
import { CoinflipResults, SocialModel, Badges, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		let social: SocialClass = await SocialModel.findOne({ id: this.int.user.id });

		if (social == null)
			social = createProfile(this.int.user.id);

		social = SocialCheckUndefineds(social);

		const result = this.FlipCoin();

		switch (result) {
			case CoinflipResults.Head:
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
						.setTitle('Coin flip!')
						.setDescription('I flipped a coin and it landed on **heads**.')]
				});
				break;
			case CoinflipResults.Tails:
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
						.setTitle('Coin flip!')
						.setDescription('I flipped a coin and it landed on **tails**.')]
				});
				break;
			case CoinflipResults.Edge:
				await this.int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
						.setTitle('Coin flip!')
						.setDescription('I flipped a coin and it landed on.... THE EDGE!!!')]
				});
				break;
		}

		social.set('coinflips', {
			heads: ((result == CoinflipResults.Head) ? ++social.coinflips.heads : social.coinflips.heads),
			tails: ((result == CoinflipResults.Tails) ? ++social.coinflips.tails : social.coinflips.tails),
			edges: ((result == CoinflipResults.Edge) ? ++social.coinflips.edges : social.coinflips.edges),
		});

		const total = social.coinflips.heads + social.coinflips.tails + social.coinflips.edges;

		// Coinflipper badges
		if (total >= 1000 && social.badges[Badges.Coinflipper1K] == 0) social.badges.set(Badges.Coinflipper1K, 1);
		if (total >= 10000 && social.badges[Badges.Coinflipper10K] == 0) social.badges.set(Badges.Coinflipper10K, 1);
		if (total >= 100000 && social.badges[Badges.Coinflipper100K] == 0) social.badges.set(Badges.Coinflipper100K, 1);
		if (total >= 1000000 && social.badges[Badges.Coinflipper1M] == 0) social.badges.set(Badges.Coinflipper1M, 1);

		// Coinflip Edge badge
		if (social.coinflips.edges >= 1 && social.badges[Badges.CoinflipEdge] == 0) social.badges.set(Badges.CoinflipEdge, 1);
		await social.save();
	}

	FlipCoin() {
		const max = 6000; // 1 edge in x
		// https://ui.adsabs.harvard.edu/abs/1993PhRvE..48.2547M/abstract

		const rng = Math.floor(Math.random() * (max - 0 + 1) + 0);

		if (rng < max / 2) {
			return CoinflipResults.Head; // 0-49 (50%)
		} else if (rng > max / 2) {
			return CoinflipResults.Tails; // 51-100 (50%)
		} else if (rng == max / 2) {
			return CoinflipResults.Edge; // 50 (1%)
		}
	}
}
