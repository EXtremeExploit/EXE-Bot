const main = new (require('../scripts/scripts')).Main();
const data = main.getData();
const { Client } = require('discord.js');
class Replies {
	/**
	 * 
	 * @param {Client} client 
	 */
	constructor(client) {
		this.standard = require('./standard');
		this.osu = require('./osu');
		if (data.replies().standard == true || data.replies().standard == 'true') {
			new this.standard(client);
			if (data.replies().osu == true || data.replies().osu == 'true') {
				new this.osu(client);
			}
		}
	}
}
module.exports = Replies;
