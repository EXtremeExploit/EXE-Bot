import discord from 'discord.js';
import { convertDate } from '../../util.js';
export default class {
    constructor(client, msg) {
        let user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);
        let status;
        switch (user.presence.status) {
            case `online`:
                status = `Online`;
                break;
            case `dnd`:
                status = `Do Not Disturb`;
                break;
            case `idle`:
                status = `AFK`;
                break;
            case `offline`:
                status = `Offline`;
                break;
        }
        let ClientStatus = 'NA';
        if (user.presence.clientStatus) {
            if (user.presence.clientStatus.web)
                ClientStatus = `Web`;
            if (user.presence.clientStatus.desktop)
                ClientStatus = `Desktop`;
            if (user.presence.clientStatus.mobile)
                ClientStatus = `Mobile`;
        }
        msg.channel.send(new discord.MessageEmbed()
            .setDescription(`${user.user.username} info`)
            .setColor([255, 0, 0])
            .addField(`Full Username`, user.user.tag, true)
            .addField(`ID`, user.id, true)
            .addField(`Roles`, `**Hoist:** ${user.roles.hoist}\n` +
            `**Highest:** ${user.roles.highest}\n` +
            `**Color:** ${user.roles.color}`, true)
            .addField(`Presence`, `**Device:** ${ClientStatus}\n` +
            `**Status:** ${status}\n`, true)
            .addField(`Dates`, `**Created:** ${convertDate(user.user.createdAt, user.user.createdTimestamp)}\n` +
            `**Joined:** ${convertDate(user.joinedAt, user.joinedTimestamp)}`, true)
            .addField(`Bot`, user.user.bot, true)
            .addField(`Avatar`, `**Avatar Hash:** ${user.user.avatar}\n` +
            `**AvatarURL:** ${user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })}`, true)
            .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
    }
}
