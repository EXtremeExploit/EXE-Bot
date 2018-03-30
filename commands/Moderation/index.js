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
class Moderation {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.ban = require('./ban');
        this.kick = require('./kick');
        this.mute = require('./mute');
        this.prune = require('./prune');
        this.unmute = require('./unmute');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case 'ban': return new this.ban(msg, client);
            case 'kick': return new this.kick(msg, client);
            case 'mute': return new this.mute(msg, client);
            case 'prune': return new this.prune(msg, client);
            case 'unmute': return new this.unmute(msg, client);
        }
    }
}
module.exports = Moderation;
