const main = new (require('../scripts/')).Main();
const data = main.getData();
var osuApiKey = data.osuApiKey();
const {  Client } = require('discord.js');
class StandardReplies {
    /**
     * @param {Client} client 
     */
    constructor(client) {
        client.on('message', (msg) => {
            if (msg.author.bot) return;
            if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;

            var message = msg.content.toLowerCase();

            if (message == 'ayy')
                msg.channel.send('lmao');
            if (message == 'omaewa mou shindeiru' || message == 'omae wa mou shindeiru')
                msg.channel.send('NANI!?!');
            if (message == 'おまえ わ もう しんでいる')
                msg.channel.send('なに！？');
            if (message == 'o/')
                msg.channel.send('\\o');
            if (message == '\\o')
                msg.channel.send('o/');
            if (message == 'top')
                msg.channel.send('kek');
            if (message == 'sauce')
                msg.channel.send('no ketchup');
        });
    }
}
module.exports = StandardReplies;
