const main = require('../index').Main;

class Games {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        this.osu = require('./Osu/');
        new this.osu(msg, client);
    }
}
module.exports = Games;
exports.Main = main;
