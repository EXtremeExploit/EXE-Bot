import discord from 'discord.js';
import config from '../../config.js'
let wikis = new config().GetWikis();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let images = [
			`https://pa1.narvii.com/6490/e9649d41af555774b0bd62ed43c050dc036ed6c9_hq.gif`,
			`http://i0.kym-cdn.com/photos/images/original/001/142/787/396.gif`,
			`https://media.giphy.com/media/SvQ7tWn8zeY2k/source.gif`,
			`https://78.media.tumblr.com/18e1fdcde34edf0cf03c588162fbd0ea/tumblr_npeccq4y3H1rzk6edo1_500.gif`,
			`https://pa1.narvii.com/6353/60e5d2c9721de7f3f3b1946acfa3acc2f3d43b9e_hq.gif`,
			`http://i.imgur.com/laEy6LU.gif`,
			`https://funnypictures1.fjcdn.com/funny_gifs/Head_389b42_6102763.gif`,
			`https://memestatic4.fjcdn.com/thumbnails/comments/She+deserves+all+the+head+pats+_952b94cc7a9bfd9107e28ece64b158de.gif`
		];
		let patImg = images[Math.floor(Math.random() * images.length)];
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.member.id) {
				msg.channel.send(new discord.MessageEmbed()
					.setTitle(`${msg.member.user.username} Has given a headpat to himself`)
					.setColor([255, 0, 0])
					.setAuthor(`>///<`)
					.setImage(`https://i.imgur.com/PYD7b5A.gif`));
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setTitle(`${msg.member.user.username} Has given a headpat to ${msg.mentions.members.first().user.username}`)
					.setColor([255, 0, 0])
					.setAuthor(`>///<`)
					.setImage(patImg));
			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check the [wiki](${wikis.commands}#fun) for help!`)
				.setDescription(`Please specify an user!`));
		}
	}
}