import discord from 'discord.js';
export default class {
    constructor(client, msg) {
        let user = (msg.mentions.members.first()) ? (msg.mentions.members.first().user) : (msg.author);
        msg.channel.send(new discord.MessageEmbed()
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
            .setColor([255, 0, 0])
            .setURL(user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
            .setTitle(`URL`)
            .setDescription(`${user.username}\`s Avatar`));
    }
}
