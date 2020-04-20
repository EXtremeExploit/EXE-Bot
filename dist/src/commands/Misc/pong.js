import discord from 'discord.js';
export default class {
    constructor(client, msg) {
        msg.channel.send(new discord.MessageEmbed()
            .setTitle(`Ponging...`)
            .setColor([0, 0, 255])).then((pingMsg) => {
            pingMsg.edit(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setTitle(`Ping!`)
                .setTimestamp(new Date())
                .addField(`Bot`, `**${pingMsg.createdTimestamp - msg.createdTimestamp}ms.**`, true)
                .addField(`API`, `**${client.ws.ping}ms.**`, true));
        });
    }
}
