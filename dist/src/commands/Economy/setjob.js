import discord from 'discord.js';
import * as mongoose from 'mongoose';
import { EconomyModel } from '../../util.js';
import config from '../../config.js';
let db = new config().GetDB();
let prefix = new config().GetPrefix();
export default class {
    constructor(client, msg) {
        let args = msg.content.split(` `).slice(1).join(` `);
        if (args.length < 2) {
            msg.reply('Your job can\'t be less than 2 characteres long');
            return;
        }
        mongoose.default.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((e) => new Error(e));
        EconomyModel.findOne({
            id: msg.author.id.toString()
        }, (err, Economy) => {
            if (err)
                throw err;
            var updatetxt;
            if (Economy == undefined) {
                updatetxt = `Started to work as ${args}`;
                let Economy = new EconomyModel({
                    id: msg.author.id,
                    money: 0,
                    workCount: 0,
                    workName: args
                });
                Economy.save();
            }
            else {
                updatetxt = `Changed his work to ${args}`;
                Economy.workName = args;
                Economy.save();
            }
            msg.channel.send(new discord.MessageEmbed()
                .setTitle(`${msg.member.user.username} ${updatetxt}`)
                .setColor([255, 0, 0]));
        });
    }
}
