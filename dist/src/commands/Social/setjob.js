import discord from 'discord.js';
import { SocialModel, createProfile, SocialCheckUndefineds } from '../../util.js';
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        let args = this.msg.content.split(` `).slice(1).join(` `);
        if (args.length < 2) {
            this.msg.reply('Your job can\'t be less than 2 characteres long');
            return;
        }
        let social = await SocialModel.findOne({
            id: this.msg.author.id
        });
        let updatetxt;
        if (social == undefined) {
            social = createProfile(this.msg.author.id);
            updatetxt = `Started to work as ${args}`;
        }
        else {
            updatetxt = `Changed his work to ${args}`;
        }
        social = SocialCheckUndefineds(social);
        social.set('workName', args);
        social.save();
        this.msg.channel.send(new discord.MessageEmbed()
            .setTitle(`${this.msg.member.user.username} ${updatetxt}`)
            .setColor([255, 0, 0]));
        return true;
    }
}
