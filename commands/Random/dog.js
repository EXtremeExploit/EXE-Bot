const discord = require('discord.js');
const { Message, Client } = discord;
const randomDog = require('random.dog.js').api();
class dog {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		randomDog.getDog().then((dog) => {
			msg.channel.send(new discord.RichEmbed()
				.setImage(dog.url)
				.setColor([255, 0, 0])
				.setTitle('Random Dog')
				.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL));
		});
	}
}
module.exports = dog;
