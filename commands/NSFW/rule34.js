const main = require('../commands').Main;
main.getPrototypes();
var tools = main.getTools();
const data = main.getData();
var prefix = data.prefix();

const discord = require('discord.js');
const { Message, Client } = discord;
class rule34 {
	/**
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {
		var messageArray = msg.content.split(' ');
		var args = messageArray.slice(1).join(' ');

		if (msg.channel.nsfw == true || msg.channel.name.startsWith('nsfw')) {
			msg.reply('Searching...');
			let searchOld;
			if (msg.content.startsWith(prefix + 'rule34 '))
				searchOld = msg.content.replace(prefix + 'rule34 ', '');
			else if (msg.content.startsWith(prefix + 'r34 '))
				searchOld = msg.content.replace(prefix + 'r34 ', '');
			let search = args.toLowerCase();
			while (search.includes(' '))
				search = search.replace(' ', '_');
			let link = 'https://rule34.paheal.net/post/list/' + search + '/1';
			link.fetchHTTP().then((res) => {
				let nb = Number(res.text.split('">Last</a>').shift().split(' | <a href="/post/list/').pop().split('/').pop());
				let page = tools.random(1, nb);
				let link = 'https://rule34.paheal.net/post/list/' + search + '/' + page;
				return link.fetchHTTP();
			}).then((res) => {
				let html = res.text;
				for (let i = 0; i <= 100; i++)
					html = html.replace('<a href="http://rule34-data-', '<-SPLIT->-').replace('">Image Only</a>', '<-SPLIT->-');
				let htmlTab = html.split('<-SPLIT->-');
				let imgs = [];
				for (let i = 0; i < htmlTab.length; i++)
					if (htmlTab[i].includes('_images')) imgs.push(htmlTab[i].split('</a><br><a href="').pop());
				if (imgs.length != 0) {
					if (searchOld == undefined) searchOld = '';
					var img = imgs.random();
					msg.channel.send(new discord.RichEmbed()
						.setColor([255, 0, 0])
						.setTitle('Rule34')
						.setURL(img)
						.setAuthor(msg.author.username, msg.author.displayAvatarURL)
						.setDescription('You Searched: ' + searchOld)
						.setImage(img));
				} else
					return;
			}).catch((e) => {
				if (e.message == '404 Shimmie') {
					return msg.channel.send('Sorry, I didn\'t find anything about ``' + searchOld + '``.');
				} else {
					return console.log(e);
				}
			});
		} else {
			msg.channel.send(new discord.RichEmbed()
				.setAuthor(msg.author.username, msg.author.displayAvatarURL)
				.setColor([255, 0, 0])
				.setTitle('NSFW Error!')
				.setDescription('NSFW channel only!'));
		}
	}
}
module.exports = rule34;
