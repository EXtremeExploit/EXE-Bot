const main = require('../../commands').Main;
const data = main.getData();
var prefix = data.prefix();
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
		var command = command_prefix.replace(prefix, '');

		switch (command) {
			case 'osu': return new this.osu(msg, client);
			case 'osuBanner': return new this.osuBanner(msg, client);
			case 'osuBeatmap': return new this.osuBeatmap(msg, client);

		}
	}
}
module.exports = Osu;
