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
            var send = msg.channel.send;

            switch (message) {
                case 'ayy': send('lamo'); break;
                case 'omae wa mou shindeiru': send('NANI!?!'); break;
                case 'おまえ わ もう しんでいる': send('なに！？'); break;
                case 'o/': send('\\o'); break;
                case '\\o': send('o/'); break;
                case 'top': send('kek'); break;
                case 'sauce': send('no ketchup'); break;
                case 'expand': send('dong'); break;
                case 'owo': send('Wat\'s This?'); break;
            }
        });
    }
}
module.exports = StandardReplies;
