import discord from 'discord.js';
import { SocialModel, GetStringFromBadges, createProfile, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();
export default class {
    constructor(client, msg) {
        let user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);
        SocialModel.findOne({
            id: user.id
        }, (err, social) => {
            if (err)
                throw err;
            if (social == null)
                social = createProfile(user.id);
            social = SocialCheckUndefineds(social);
            let workText = social.workName == '' ? `${social.alias == '' ? user.user.username : social.alias} Doesn't have a job` : `${social.alias == '' ? user.user.username : social.alias} works as ${social.workName}`;
            let badges = GetStringFromBadges(social.badges);
            let kd = social.kills / social.deaths;
            msg.channel.send(new discord.MessageEmbed()
                .setTitle(`${social.alias == '' ? user.user.username : social.alias} Profile`)
                .setColor(0x0000FF)
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .setDescription(workText)
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .addField('Info', `**Reputation:** ${social.rep} \n` +
                `**Kills:** ${social.kills} \n` +
                `**Deaths:** ${social.deaths} \n` +
                `**K/D:** ${kd}\n` +
                `**Cookies:** ${social.cookies} \n` +
                `**Sandwichs:** ${social.sandwichs}\n` +
                `**OwO's:** ${social.owos}`, true)
                .addField('Work', `**Money:** ${social.money}\n` +
                `**Profession:** ${social.workName}\n` +
                `**Work Count:** ${social.workCount}`, true)
                .addField('Badges', badges, true)
                .addField('Coinflips', `**Heads:** ${social.coinflips.heads}\n` +
                `**Tails:** ${social.coinflips.tails}\n` +
                `**Edges:** ${social.coinflips.edges}`)
                .setTimestamp(new Date));
        });
    }
}
