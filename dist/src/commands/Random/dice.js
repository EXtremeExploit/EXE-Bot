import discord from 'discord.js';
export default class {
    constructor(client, msg) {
        const dice = Math.floor(Math.random() * 6) + 1;
        msg.channel.send(new discord.MessageEmbed()
            .setColor([255, 0, 0])
            .setTitle('Dice')
            .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
            .setDescription('You took a **' + dice + '**'));
    }
}
