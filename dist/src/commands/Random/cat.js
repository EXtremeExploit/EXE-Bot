import discord from 'discord.js';
import _randomCat from 'random.cat.js';
let randomCat = _randomCat.api();
export default class {
    constructor(client, msg) {
        randomCat.getCat().then((cat) => {
            msg.channel.send(new discord.MessageEmbed()
                .setImage(cat.file)
                .setColor([255, 0, 0])
                .setTitle('Random Cat')
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
        });
    }
}
