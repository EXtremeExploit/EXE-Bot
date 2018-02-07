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
class Info {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.avatar = require('./avatar');
        this.channel = require('./channel');
        this.role = require('./role');
        this.server = require('./server');
        this.user = require('./user');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case 'avatar':
                new this.avatar(msg, client);
                break;
            case 'channel':
                new this.channel(msg, client);
                break;
            case 'role':
                new this.role(msg, client);
                break;
            case 'server':
                new this.server(msg, client);
                break;
            case 'user':
                new this.user(msg, client);
                break;
        }
    }
}
module.exports = Info;
