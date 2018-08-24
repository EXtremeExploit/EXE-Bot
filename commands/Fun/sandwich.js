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
class sandwich {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var images = [
			'https://pa1.narvii.com/6272/7beb194348fefb46bfdd519cb1ef0e530a621247_hq.gif',
			'https://i.imgur.com/325tm32.gif',
			'https://mayraissenpai.files.wordpress.com/2016/12/tumblr_m6krnt7ghk1qk46vzo1_500.gif?w=656',
			'https://78.media.tumblr.com/66405e70b83061ec312ba553eb577847/tumblr_n6k8kv9AK21r4kkpvo1_500.gif',
			'https://78.media.tumblr.com/c4ced24d4ffaba84b430a9faca23d206/tumblr_opnapuxv531vviqkjo1_500.gif',
			'https://i.pinimg.com/originals/c5/b6/94/c5b694dbce3e8662b01adb6771463aa1.gif'
		];
		var sandwichImg = images[Math.floor(Math.random() * images.length)];
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.member.id) {
				msg.channel.send(new discord.RichEmbed()
					.setAuthor(msg.author.username, msg.author.displayAvatarURL)
					.setColor([255, 0, 0])
					.setDescription('You cant give a sandwich to youself, that stuff doesn\'t  grow from trees!!'));
			} else {
				sql.query(`SELECT * FROM sandwiches WHERE id = ${msg.mentions.members.first().id}`, (err, rows) => {
					if (err) throw err;

					var query;

					if (rows.length < 1) {
						query = `INSERT INTO sandwiches(id,sandwiches) VALUES ('${msg.mentions.members.first().id}', 1)`;
					} else {
						var sandwiches = rows[0].sandwiches;
						query = `UPDATE sandwiches SET sandwiches = ${sandwiches + 1} WHERE id = ${msg.mentions.members.first().id}`;
					}

					sql.query(query);

					msg.channel.send(new discord.RichEmbed()
						.setTitle(msg.member.user.username + ' Has given a sandwich to ' + msg.mentions.members.first().user.username)
						.setColor([255, 0, 0])
						.setImage(sandwichImg));
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
module.exports = sandwich;
