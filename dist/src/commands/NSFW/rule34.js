import discord from 'discord.js';
import booru from 'booru';
import { random } from '../../util.js';
export default class {
    constructor(client, msg) {
        if (msg.channel.nsfw || msg.channel.name.startsWith(`nsfw`)) {
            try {
                let query = msg.content.split(` `).slice(1).join(` `);
                booru.search(`rule34.xxx`, query, { limit: 1000, random: true }).then((posts) => {
                    if (posts.length == 0) {
                        msg.channel.send(`Sorry, I didn't find anything about \`\`${query}\`\`.`);
                    }
                    else {
                        let post = posts[random(posts.length) - 1];
                        let link = post.fileUrl;
                        msg.channel.send(new discord.MessageEmbed()
                            .setColor([255, 0, 0])
                            .setTitle(`Rule34`)
                            .setURL(post.postView)
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                            .setImage(link)
                            .setDescription(`You Searched: ${query}`));
                    }
                });
            }
            catch (err) {
                console.log(err);
                msg.channel.send(new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .setDescription(`An error ocurred!`)
                    .setTitle(`Rule34`)
                    .addField(`Message Error`, err)
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
            }
        }
        else {
            msg.channel.send(new discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .setColor([255, 0, 0])
                .setTitle(`NSFW Error!`)
                .setDescription(`NSFW channels only!`));
        }
    }
}
