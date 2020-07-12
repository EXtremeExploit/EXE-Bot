import discord from 'discord.js';
import { OwOModel } from '../../util.js';
import config from '../../config.js';
let db = new config().GetDB();
export default class {
    constructor(client, msg) {
        OwOModel.findOne({
            id: msg.author.id
        }, (err, owos) => {
            if (err)
                throw err;
            let times;
            if (owos == null) {
                let owos = new OwOModel({
                    id: msg.author.id,
                    count: 1
                });
                times = 1;
                owos.save();
            }
            else {
                let owoss = owos.count;
                times = owoss + 1;
                owos.count = times;
                owos.save();
            }
            msg.channel.send(new discord.MessageEmbed()
                .setTitle(`${msg.member.user.username} Just ÒwÓ'd, He went OwO ${times} times`)
                .setColor([255, 0, 0]));
        });
    }
}
