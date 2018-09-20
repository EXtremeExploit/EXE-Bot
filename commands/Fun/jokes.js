const discord = require('discord.js');
const { Message, Client } = discord;
class joke {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var jokes = [
			'Your life',
			'skidaddle skidoodle\nyour dick is now a noodle',
			'Is this a meme?',
			'This command is the best command ever created',
			'Fortnite is good for your brain cells',
			'wow did we just found a dead meme?',
			'do you know the way?',
			'ur mom gay',
			'no u',
			'TidePod-Chan: Eat me onii-baka',
			'BUY MY CHAIR, ITS ONLY $399',
			'SUCC',
			'Half-Life 3 coming soon:tm:',
			'I got a feelin\' called the blues, oh, Lord\n' +
			'Since my baby said goodbye\n' +
			'Lord, I don\'t know what I\'ll do\n' +
			'All I do is sit and sigh, oh, Lord\n\n' +
			'That last long day she said goodbye\n' +
			'Well Lord I thought I would cry\n' +
			'She\'ll do me, she\'ll do you, she\'s got that kind of lovin\'\n' +
			'Lord, I love to hear her when she calls me sweet daddy\n\n' +
			'Such a beautiful dream\n' +
			'I hate to think it all over, I\'ve lost my heart it seems\n' +
			'I\'ve grown so used to you somehow' +
			'Well, I\'m nobody\'s sugar daddy now' +
			'And I\'m lonesome, I got the lovesick blues',
			'Dat boi',
			'how italians do things',
			'hippity hoppity your soul is now my property',
			'omae wa mou shindeiru\nNANI!?!?',
			'mac is good for gaming',
			'Somebody once told me the world is gonna roll me\n' +
			'I ain\'t the sharpest tool in the shed\n' +
			'She was looking kind of dumb with her finger and her thumb\n' +
			'In the shape of an "L" on her forehead',
			'Despacito 2 announces Battle Royale'
		];
		var joke = jokes[Math.floor(Math.random() * jokes.length)];
		msg.channel.send(new discord.RichEmbed()
			.setTitle('Jokes oWo')
			.setAuthor(msg.author.username, msg.author.displayAvatarURL)
			.setColor([255, 0, 0])
			.setDescription(joke));
	}
}
module.exports = joke;
