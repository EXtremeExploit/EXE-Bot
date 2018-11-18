const main = require('../commands').Main;
const data = main.getData();

var mongoose = require('mongoose');
mongoose.connect(data.db().url, {
	useNewUrlParser: true
}).catch((e) => new Error(e));
var sandwichModel = main.getModels().sandwich;
var cookieModel = main.getModels().cookie;

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

		sandwichModel.findOne({
			id: user.id.toString()
		}, (err, sandwich) => {
			if (err) throw err;

			cookieModel.findOne({
				id: user.id.toString()
			}, (err, cookie) => {
				if (err) throw err;

				var cookies = (cookie == null) ? ('This user doesn\'t have cookies :(') : (cookie.count);
				var sandwiches = (sandwich == null) ? ('This user doesn\'t have sandwiches :(') : (sandwich.count);

				msg.channel.send(new discord.RichEmbed()
					.setColor([0, 0, 255])
					.setDescription('Stats from ' + user.user.username)
					.addField('Food', '**Cookies:** ' + cookies + '\n' +
						'**Sandwiches:** ' + sandwiches)
					.setAuthor(user.user.username, user.user.displayAvatarURL));
			});
		});
	}
}
module.exports = stats;
