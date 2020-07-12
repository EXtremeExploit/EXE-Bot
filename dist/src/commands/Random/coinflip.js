import discord from 'discord.js';
import * as mongoose from 'mongoose';
import { CoinflipModel, CoinflipResults } from '../../util.js';
import config from '../../config.js';
let db = new config().GetDB();
export default class {
    constructor(client, msg) {
        mongoose.default.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((e) => new Error(e));
        CoinflipModel.findOne({
            id: msg.author.id
        }, (err, coinflip) => {
            if (err)
                throw err;
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
            if (coinflip == null) {
                let newCoinflip = new CoinflipModel({
                    id: msg.author.id,
                    heads: ((result == CoinflipResults.Head) ? 1 : 0),
                    tails: ((result == CoinflipResults.Tails) ? 1 : 0),
                    edge: ((result == CoinflipResults.Edge) ? 1 : 0)
                });
                newCoinflip.save();
            }
            else {
                coinflip.heads += ((result == CoinflipResults.Head) ? 1 : 0);
                coinflip.tails += ((result == CoinflipResults.Tails) ? 1 : 0);
                coinflip.edge += ((result == CoinflipResults.Edge) ? 1 : 0);
                coinflip.save();
            }
        });
    }
    FlipCoin() {
        let max = 1e17;
        let rng = Math.random() * max;
        if (rng < max / 2) {
            return CoinflipResults.Head;
        }
        else if (rng > max / 2) {
            return CoinflipResults.Tails;
        }
        else if (rng == max / 2) {
            return CoinflipResults.Edge;
        }
    }
}
