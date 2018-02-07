const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
const randomDog = require('random.dog.js').api();
class dog {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        randomDog.getDog().then(dog => {
            msg.channel.send(new discord.RichEmbed()
                .setImage(dog.url)
                .setColor([255, 0, 0])
                .setTitle('Random Dog')
                .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
        });
    }
}
module.exports = dog;
