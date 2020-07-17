import discord from 'discord.js';
import config from '../../config.js';
let wikis = new config().GetWikis();
export default class {
    constructor(client, msg) {
        if (msg.member.hasPermission([`BAN_MEMBERS`]) || msg.member.hasPermission([`ADMINISTRATOR`])) {
            if (msg.mentions.members.first()) {
                if (msg.member.user.id == msg.mentions.members.first().id) {
                    msg.channel.send(new discord.MessageEmbed()
                        .setColor([255, 0, 0])
                        .setDescription(`Why do you want to ban yourself...?`)
                        .setTitle(`Are you serious?`));
                }
                else {
                    if (msg.mentions.members.first().id == client.user.id) {
                        msg.channel.send(new discord.MessageEmbed()
                            .setColor([255, 0, 0])
                            .setDescription(`WHY ME!!!???`)
                            .setTitle(`;-;`));
                    }
                    else {
                        if (msg.mentions.members.first().bannable) {
                            msg.mentions.members.first().ban().then((member) => {
                                msg.channel.send(new discord.MessageEmbed()
                                    .setColor([255, 0, 0])
                                    .setTitle(`Banned`)
                                    .setDescription(`Succesfully banned: ${member.user.tag}`));
                            });
                        }
                        else {
                            msg.channel.send(new discord.MessageEmbed()
                                .setColor([255, 0, 0])
                                .setTitle(`Ban Error`)
                                .setDescription(`I don't have permissions to do that`));
                        }
                    }
                }
            }
            else {
                msg.channel.send(new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .addField(`Help`, `Check the [wiki](${wikis.commands}#moderation) for help!`)
                    .setDescription(`Please specify an user!`));
            }
        }
        else {
            msg.channel.send(new discord.MessageEmbed()
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .setTitle(`ERROR`)
                .setDescription(`You dont have permissions to run that command.`)
                .setColor([255, 0, 0]));
        }
    }
}
