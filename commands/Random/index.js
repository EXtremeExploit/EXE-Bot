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
class Random {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.eightball = require('./8ball');
        this.cat = require('./cat');
        this.coinflip = require('./coinflip');
        this.dice = require('./dice');
        this.dog = require('./dog');
        this.rate = require('./rate');
        this.roll = require('./roll');
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        switch (command) {
            case '8ball': return new this.eightball(msg, client);
            case 'cat': return new this.cat(msg, client);
            case 'coinflip': return new this.coinflip(msg, client);
            case 'dice': return new this.dice(msg, client);
            case 'dog': return new this.dog(msg, client);
            case 'rate': return new this.rate(msg, client);
            case 'roll': return new this.roll(msg, client);
        }
    }
}
module.exports = Random;
