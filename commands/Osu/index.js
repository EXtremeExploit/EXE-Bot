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
        if (msg.author.bot) return;
        switch (command) {
            case 'osuBeatmap':
                new this.osuBeatmap(msg, client);
                break;
            case 'osuCtbBest':
                new this.osuCtbBest(msg, client);
                break;
            case 'osuCtbUser':
                new this.osuCtbUser(msg, client);
                break;
            case 'osuManiaBest':
                new this.osuManiaBest(msg, client);
                break;
            case 'osuManiaUser':
                new this.osuManiaUser(msg, client);
                break;
            case 'osuStdBest':
                new this.osuStdBest(msg, client);
                break;
            case 'osuStdUser':
                new this.osuStdUser(msg, client);
                break;
            case 'osuTaikoBest':
                new this.osuTaikoBest(msg, client);
                break;
            case 'osuTaikoUser':
                new this.osuTaikoUser(msg, client);
                break;
        }
    }
}
module.exports = Osu;
