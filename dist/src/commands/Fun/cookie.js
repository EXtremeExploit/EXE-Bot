import discord from 'discord.js';
import { createProfile, SocialModel, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let wikis = new config().GetWikis();
export default class {
    constructor(client, msg) {
        let images = [
            `https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif`,
            `http://i.giphy.com/E77F8BfvntOq4.gif`,
            `https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986`,
            `http://i.imgur.com/bYVl2.gif`
        ];
        let cookieImg = images[Math.floor(Math.random() * images.length)];
        if (msg.mentions.members.first()) {
            if (msg.mentions.members.first().id == msg.member.id) {
                msg.channel.send(new discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                    .setColor([255, 0, 0])
                    .setDescription(`You cant give a cookie to youself, that stuff doesn\`t  grow from trees!!`));
            }
            else {
                msg.channel.send(new discord.MessageEmbed()
                    .setTitle(`${msg.member.user.username} Has given a cookie to ${msg.mentions.members.first().user.username}`)
                    .setColor([255, 0, 0])
                    .setImage(cookieImg));
                SocialModel.findOne({ id: msg.mentions.members.first().id }, (err, social) => {
                    if (err)
                        throw err;
                    if (social == null)
                        social = createProfile(msg.mentions.members.first().id);
                    social = SocialCheckUndefineds(social);
                    social.set('cookies', social.cookies + 1);
                    social.save();
                });
            }
        }
        else {
            msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .addField(`Help`, `Check the [wiki](${wikis.commands}#fun) for help!`)
                .setDescription(`Please specify an user!`));
        }
    }
}
