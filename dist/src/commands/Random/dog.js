import discord from 'discord.js';
import _randomDog from 'random.dog.js';
let randomDog = _randomDog.api();
export default class {
    constructor(client, msg) {
        randomDog.getDog().then((dog) => {
            msg.channel.send(new discord.MessageEmbed()
                .setImage(dog.url)
                .setColor([255, 0, 0])
                .setTitle('Random Dog')
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
        });
    }
}
