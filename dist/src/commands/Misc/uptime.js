import discord from 'discord.js';
export default class {
    constructor(client, msg) {
        let miliseconds = client.uptime % 1000;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        let minutes = Math.floor(Math.floor(client.uptime / 1000) / 60) % 60;
        let hours = Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) % 24;
        let days = Math.floor(Math.floor(Math.floor(Math.floor(client.uptime / 1000) / 60) / 60) / 24);
        msg.channel.send(new discord.MessageEmbed()
            .setColor([255, 0, 0])
            .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 1024, format: `png` }))
            .addField(`Days`, days)
            .addField(`Hours`, hours)
            .addField(`Minutes`, minutes)
            .addField(`Seconds`, seconds)
            .addField(`Miliseconds`, miliseconds));
    }
}
