const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var prefix = data.prefix();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};


const Danbooru = require('danbooru');
const booru = new Danbooru();

const discord = require('discord.js');
const { Message, Client } = discord;
class danbooru {
    /**
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        if (msg.channel.nsfw == true || msg.channel.name.startsWith('nsfw')) {
            try {
                let query = msg.content.split(' ').slice(1);
                if (query.length > 2) {
                    msg.channel.send('You can\'t search for more than 2 tags at the same time.');
                }
                booru.posts(query).then((posts) => {
                    if (posts.length == 0) {
                        msg.channel.send('Sorry, I didn\'t find anything about ``' + query.join(' ') + '``.');
                    } else {
                        let post = { large_file_url: undefined };
                        while (post.large_file_url === undefined)
                            post = posts.random().raw;
                        let link = post.large_file_url.includes('https://') ? post.large_file_url : 'http://danbooru.donmai.us' + post.large_file_url;
                        msg.channel.send(new discord.RichEmbed()
                            .setColor([255, 0, 0])
                            .setTitle('Danbooru')
                            .setURL(link)
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
                            .setImage(link)
                            .setDescription('You Searched: ' + query.join(' ')));
                    }
                });
            } catch (err) {
                if (!err == '404 Shimmie') {
                    console.log(err);
                } else {
                    console.log(err);
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('An error ocurred!')
                        .setTitle('Danbooru')
                        .addField('Message Error', err)
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL));
                }
            }
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL)
                .setColor([255, 0, 0])
                .setTitle('NSFW Error!')
                .setDescription('NSFW channel only!'));
        }
    }
}
module.exports = danbooru;
