const main = require('../commands').Main;

class Games {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		this.fortnite = require('./Fortnite/FortniteCMD');
		this.osu = require('./Osu/osu!');
		new this.fortnite(msg, client);
		new this.osu(msg, client);
	}
}
module.exports = Games;
exports.Main = main;
