const { Client } = require('discord.js');
class StandardReplies {
	/**
	 * @param {Client} client 
	 */
	constructor(client) {
		client.on('message', (msg) => {
			if (msg.author.bot) return;
			if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;
			if (msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES') == true) {
				
				var message = msg.content.toLowerCase();
				var channel = msg.channel;

				switch (message) {
					case 'ayy': channel.send('lmao'); break;
					case 'omae wa mou shindeiru': channel.send('NANI!?!'); break;
					case 'お前はもう、死んでいる':
					case 'お前はもう死んでいる': channel.send('何？！'); break;
					case 'o/': channel.send('\\o'); break;
					case '\\o': channel.send('o/'); break;
					case 'top': channel.send('kek'); break;
					case 'sauce': channel.send('no ketchup'); break;
					case 'expand': channel.send('dong'); break;
					case 'owo': channel.send('What\'s This?'); break;
					case '\\o/': channel.send('<o/'); break;
					case '<o/': channel.send('\\o>'); break;
					case '\\o>': channel.send('<o/'); break;
				}
			} else return;
		});
	}
}
module.exports = StandardReplies;
