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
class Osu {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.osuBeatmap = require('./osuBeatmap');
        this.osuCtbBest = require('./osuCtbBest');
        this.osuCtbUser = require('./osuCtbUser');
        this.osuManiaBest = require('./osuManiaBest');
        this.osuManiaUser = require('./osuManiaUser');
        this.osuStdBest = require('./osuStdBest');
        this.osuStdUser = require('./osuStdUser');
        this.osuTaikoBest = require('./osuTaikoBest');
        this.osuTaikoUser = require('./osuTaikoUser');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case 'osuBeatmap': return new this.osuBeatmap(msg, client);
            case 'osuCtbBest': return new this.osuCtbBest(msg, client);
            case 'osuCtbUser': return new this.osuCtbUser(msg, client);
            case 'osuManiaBest': return new this.osuManiaBest(msg, client);
            case 'osuManiaUser': return new this.osuManiaUser(msg, client);
            case 'osuStdBest': return new this.osuStdBest(msg, client);
            case 'osuStdUser': return new this.osuStdUser(msg, client);
            case 'osuTaikoBest': return new this.osuTaikoBest(msg, client);
            case 'osuTaikoUser': return new this.osuTaikoUser(msg, client);

        }
    }
}
module.exports = Osu;
