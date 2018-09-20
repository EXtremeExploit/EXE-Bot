const discord = require('discord.js');
const { Message, Client } = discord;
const randomCat = require('random.cat.js').api();
class cat {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		randomCat.getCat().then((cat) => {
			msg.channel.send(new discord.RichEmbed()
				.setImage(cat.file)
				.setColor([255, 0, 0])
				.setTitle('Random Cat')
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
		});
	}
}
module.exports = cat;
