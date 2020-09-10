import discord from 'discord.js';
import config from '../../config.js';
import { sleep } from '../../util.js';
let wikis = new config().GetWikis();
let googleKeys = new config().GetGoogle();
import _gimages from 'google-images';
const gimages = new _gimages(googleKeys.cseID, googleKeys.appApiKey);
export default class {
    constructor(client, msg) {
        let messageArray = msg.content.split(' ');
        let args = messageArray.slice(1).join(' ');
        if (args == '') {
            msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                .addField('Help', 'Check the [wiki](' + wikis.commands + '#utility) for help!')
                .setDescription('Please specify a search term!'));
        }
        else {
            gimages.search(args, {
                safe: 'medium',
            }).then((images) => {
                if (images.length == 0) {
                    msg.channel.send(new discord.MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                        .setColor([255, 0, 0])
                        .setTitle('Error')
                        .setDescription('Could not find any image on your search'));
                    return;
                }
                //Arguments are given and an image was found
                let index = 0;
                let embed = new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
                    .setDescription(`Displaying ${index + 1}/${images.length} Images`)
                    .setURL(images[index].url)
                    .setTitle('Google Image Search')
                    .setImage(images[index].url)
                    .setFooter('Getting reactions');
                //Send the embed which contains the first image
                msg.channel.send(embed).then(async (message) => {
                    //Create reaction buttons, sleep is to avoid rate limit
                    await message.react('⏮');
                    await sleep(750);
                    await message.react('◀');
                    await sleep(750);
                    await message.react('▶');
                    await sleep(750);
                    await message.react('⏭');
                    await sleep(750);
                    await message.react('⏹');
                    await sleep(750);
                    const collector = message.createReactionCollector((reaction, user) => user.id == msg.author.id, {
                        time: 60000
                    });
                    collector.on('collect', async (reaction, reactions) => {
                        if (reaction.count >= 2) {
                            switch (reaction.emoji.name) {
                                case '⏮':
                                    index = 0;
                                    break;
                                case '⏭':
                                    index = (images.length - 1);
                                    break;
                                case '⏹':
                                    collector.stop('User requested');
                                    index = index;
                                    return;
                                case '◀':
                                    index -= 1;
                                    break;
                                case '▶': index += 1;
                            }
                            if (index < 0)
                                index = 0;
                            if (index > (images.length - 1))
                                index = (images.length - 1);
                            embed.setDescription('Displaying ' + (index + 1) + '/' + images.length + ' Images')
                                .setURL(images[index].url)
                                .setImage(images[index].url);
                            await message.edit(embed);
                            reaction.users.remove(msg.author.id);
                            await message.react(reaction.emoji.name);
                        }
                    });
                    collector.on('end', (coll, reason) => {
                        message.edit(embed.setFooter('Stopped getting reactions'));
                    });
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    }
}
