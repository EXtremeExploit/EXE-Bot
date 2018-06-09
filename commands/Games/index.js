const main = require('../index').Main;

class Games {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.fortnite = require('./Fortnite');
        this.osu = require('./Osu/');
        new this.fortnite(msg, client);
        new this.osu(msg, client);
    }
}
module.exports = Games;
exports.Main = main;
