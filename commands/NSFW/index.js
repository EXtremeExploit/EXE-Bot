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
class NSFW {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.danbooru = require('./danbooru')
        this.rule34 = require('./rule34');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case 'danbooru': return new this.danbooru(msg, client);
            case 'rule34':
            case 'r34':
                return new this.rule34(msg, client);
        }
    }
}
module.exports = NSFW;
