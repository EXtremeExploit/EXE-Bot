const main = require('../commands').Main;
const data = main.getData();
const wikis = {
	home: data.wikis().home,
	commands: data.wikis().commands,
	replies: data.wikis().replies,
	faq: data.wikis().faq,
	isEnabled: data.wikisEnabled()
};
var mongoose = require('mongoose');
mongoose.connect(data.db().url, {
	useNewUrlParser: true
}).catch((e) => new Error(e));
var cookieModel = main.getModels().cookie;
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
				cookieModel.findOne({
					id: msg.mentions.members.first().id.toString()
				}, (err, cookie) => {
					if (err) throw err;

					if (cookie == null) {
						var Cookie = new cookieModel({
							id: msg.mentions.members.first().id,
							count: 1
						});
						Cookie.save();
					} else {
						var cookies = cookie.count;
						cookie.count = cookies + 1;
						cookie.save();
					}
				});

				msg.channel.send(new discord.RichEmbed()
					.setTitle(msg.member.user.username + ' Has given a cookie to ' + msg.mentions.members.first().user.username)
					.setColor([255, 0, 0])
					.setImage(cookieImg));
			}
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setColor([255, 0, 0])
				.addField('Help', 'Check the [wiki](' + wikis.commands + '#fun) for help!')
				.setDescription('Please specify an user!'));
		}
	}
}
module.exports = cookie;
