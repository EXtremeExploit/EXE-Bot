import discord from 'discord.js';
import config from '../../config.js';
import { CooldownModel } from '../../util.js';
let owner = new config().GetOwner();
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        if (this.msg.member.user.id == owner.id) {
            await CooldownModel.collection.deleteMany({});
            this.msg.reply('Cooldowns cleared');
        }
        else {
            this.msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Bot owner only!`)
                .setFooter(`how did you found this command?`));
        }
    }
}
