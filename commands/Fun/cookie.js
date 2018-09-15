const main = require('../commands').Main;
const functions = main.getFunctions();
const data = main.getData();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};
var sql = functions.connectToDatabase();

const discord = require('discord.js');
const { Message, Client } = discord;
class cookie {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var images = [
			'https://pa1.narvii.com/5899/43e61495729fd10dda05c313545a57d43ebb1dee_hq.gif',
			'http://i.giphy.com/E77F8BfvntOq4.gif',
			'https://media1.tenor.com/images/9a684862dd6a95ca16c5ecd6b02b119f/tenor.gif?itemid=5446986',
			'http://i.imgur.com/bYVl2.gif'
		];
		var cookieImg = images[Math.floor(Math.random() * images.length)];
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.member.id) {
				msg.channel.send(new discord.RichEmbed()
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.setColor([255, 0, 0])
					.setDescription('You cant give a cookie to youself, that stuff doesn\'t  grow from trees!!'));
			} else {
				sql.query(`SELECT * FROM cookies WHERE id = ${msg.mentions.members.first().id}`, (err, rows) => {
					if (err) throw err;
					var query;

					if (rows.length < 1) {
						query = `INSERT INTO cookies(id,cookies) VALUES ('${msg.mentions.members.first().id}', 1)`;
					} else {
						var cookies = rows[0].cookies;
						query = `UPDATE cookies SET cookies = ${cookies + 1} WHERE id = ${msg.mentions.members.first().id}`;
					}

					sql.query(query);

					msg.channel.send(new discord.RichEmbed()
						.setTitle(msg.member.user.username + ' Has given a cookie to ' + msg.mentions.members.first().user.username)
						.setColor([255, 0, 0])
						.setImage(cookieImg));
				});

			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
				.setDescription('Pleace specify an user!'));
		}
	}
}
module.exports = cookie;
