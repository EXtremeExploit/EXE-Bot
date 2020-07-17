import discord from 'discord.js';
import * as mongoose from 'mongoose';
import { EconomyModel } from '../../util.js';
import config from '../../config.js';
let db = new config().GetDB();
let prefix = new config().GetPrefix();
export default class {
    constructor(client, msg) {
        debugger;
        mongoose.default.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((e) => new Error(e));
        EconomyModel.findOne({
            id: msg.author.id.toString()
        }, (err, economy) => {
            if (err)
                throw err;
            let moneyMade = (Math.floor(Math.random() * 45)) + 5;
            let money;
            let workCount;
            let workName;
            if (economy == null) {
                msg.reply(`It seem you don't have a job yet... Get one with \`${prefix}setjob\``);
                return;
            }
            else {
                money = economy.money;
                economy.money += moneyMade;
                workCount = economy.workCount;
                economy.workCount += 1;
                workName = economy.workName;
                economy.save();
                msg.channel.send(new discord.MessageEmbed()
                    .setColor(0x008f18)
                    .setTitle(`${msg.author.username} Worked as ${workName}`)
                    .addField('Money', `${money} -> ${money + moneyMade} (+${moneyMade})`)
                    .addField('Work Count', `${workCount} -> ${workCount + 1} (+1)`));
            }
        });
    }
}
