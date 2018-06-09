const main = new (require('../scripts/')).Main();
const data = main.getData();
var osuApiKey = data.osuApiKey();
const { Client } = require('discord.js');
class StandardReplies {
    /**
     * @param {Client} client 
     */
    constructor(client) {
        client.on('message', (msg) => {
            if (msg.author.bot) return;
            if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;

            var message = msg.content.toLowerCase();
            var channel = msg.channel;

            switch (message) {
                case 'ayy': channel.send('lamo'); break;
                case 'omae wa mou shindeiru': channel.send('NANI!?!'); break;
                case 'おまえ わ もう しんでいる': channel.send('なに！？'); break;
                case 'o/': channel.send('\\o'); break;
                case '\\o': channel.send('o/'); break;
                case 'top': channel.send('kek'); break;
                case 'sauce': channel.send('no ketchup'); break;
                case 'expand': channel.send('dong'); break;
                case 'owo': channel.send('What\'s This?'); break;
            }
        });
    }
}
module.exports = StandardReplies;
