const main = require('../../index').Main;
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
class Osu {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.osu = require('./osu');
        this.osuBanner = require('./osuBanner');
        this.osuBeatmap = require('./osuBeatmap');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case 'osu': return new this.osu(msg, client);
            case 'osuBanner': return new this.osuBanner(msg, client);
            case 'osuBeatmap': return new this.osuBeatmap(msg, client);

        }
    }
}
module.exports = Osu;
