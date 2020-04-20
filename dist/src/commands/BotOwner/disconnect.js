import discord from 'discord.js';
import config from '../../config.js';
let owner = new config().GetOwner();
export default class {
    constructor(client, msg) {
        if (msg.member.user.id == owner.id) {
            msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .setDescription(`Disconnecting...`)
                .setTitle(`Disconnect`)).then(async () => {
                await client.destroy();
                await process.exit();
            });
        }
        else {
            msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Bot owner only!`)
                .setFooter(`how did you found this command?`));
        }
    }
}
