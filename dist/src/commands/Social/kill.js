import discord from 'discord.js';
import { SocialModel, createProfile, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();
let wikis = new config().GetWikis();
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        if (this.msg.mentions.members.first()) {
            if (this.msg.mentions.members.first().id == this.msg.member.id) {
                this.msg.channel.send(new discord.MessageEmbed()
                    .setAuthor(this.msg.author.username, this.msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                    .setColor([255, 0, 0])
                    .setDescription(`You can't kill youself, It's not that great :c`));
                return;
            }
            else {
                let KilledSocial = await SocialModel.findOne({ id: this.msg.mentions.members.first().id });
                let KillerSocial = await SocialModel.findOne({ id: this.msg.author.id });
                if (KillerSocial == null) {
                    KillerSocial = createProfile(this.msg.author.id);
                }
                if (KilledSocial == null) {
                    KilledSocial = createProfile(this.msg.mentions.members.first().id);
                }
                KillerSocial = SocialCheckUndefineds(KillerSocial);
                KilledSocial = SocialCheckUndefineds(KilledSocial);
                KillerSocial.set('kills', KillerSocial.kills + 1);
                KilledSocial.set('deaths', KilledSocial.kills + 1);
                KillerSocial.save();
                KilledSocial.save();
                this.msg.channel.send(new discord.MessageEmbed()
                    .setTitle(`${this.msg.member.user.username} has killed ${this.msg.mentions.members.first().user.username}`)
                    .setColor([0, 0, 255]));
                return true;
            }
        }
        else {
            this.msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .addField(`Help`, `Check the [wiki](${wikis.commands}#social) for help!`)
                .setDescription(`Please specify an user!`));
        }
        return false;
    }
}
