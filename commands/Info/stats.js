const main = require('../commands').Main;
const functions = main.getFunctions();
const data = main.getData();
var sql = functions.connectToDatabase();

const discord = require('discord.js');
const { Message, Client } = discord;
class stats {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);

		sql.query(`SELECT * FROM cookies WHERE id = ${user.user.id}`, (err, cookies) => {
			if (err) throw err;
			sql.query(`SELECT * FROM sandwiches WHERE id = ${user.user.id}`, (err, sandwiches) => {
				if (err) throw err;

				var cookie = (cookies.length < 1) ? ('This user doesn\'t have cookies :(') : (cookies[0].cookies);

				var sandwich = (sandwiches.length < 1) ? ('This user doesn\'t have sandwiches :(') : (sandwiches[0].sandwiches);

				msg.channel.send(new discord.RichEmbed()
					.setColor([0, 0, 255])
					.setDescription('Stats from ' + user.user.username)
					.addField('Food', '**Cookies:** ' + cookie + '\n' +
						'**Sandwiches:** ' + sandwich)
					.setAuthor(user.user.username, user.user.displayAvatarURL));
			});

		});
	}
}
module.exports = stats;
