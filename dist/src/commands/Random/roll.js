import discord from 'discord.js';
export default class {
    constructor(client, msg) {
        const roll = Math.floor(Math.random() * 100) + 1;
        msg.channel.send(new discord.MessageEmbed()
            .setColor([255, 0, 0])
            .setTitle('Roll')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
            .setDescription('You Rolled a: **' + roll + '**'));
    }
}
