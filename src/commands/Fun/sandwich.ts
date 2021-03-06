import discord from 'discord.js';
import { SocialModel, createProfile, SocialClass, SocialCheckUndefineds } from '../../util.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let images = [
			`https://pa1.narvii.com/6272/7beb194348fefb46bfdd519cb1ef0e530a621247_hq.gif`,
			`https://i.imgur.com/325tm32.gif`,
			`https://mayraissenpai.files.wordpress.com/2016/12/tumblr_m6krnt7ghk1qk46vzo1_500.gif?w=656`,
			`https://78.media.tumblr.com/66405e70b83061ec312ba553eb577847/tumblr_n6k8kv9AK21r4kkpvo1_500.gif`,
			`https://78.media.tumblr.com/c4ced24d4ffaba84b430a9faca23d206/tumblr_opnapuxv531vviqkjo1_500.gif`,
			`https://i.pinimg.com/originals/c5/b6/94/c5b694dbce3e8662b01adb6771463aa1.gif`
		];
		let sandwichImg = images[Math.floor(Math.random() * images.length)];
		if (msg.mentions.members.first()) {
			if (msg.mentions.members.first().id == msg.member.id) {
				msg.channel.send(new discord.MessageEmbed()
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
					.setColor([255, 0, 0])
					.setDescription(`You cant give a sandwich to youself, that stuff doesn't  grow from trees!!`));
			} else {
				msg.channel.send(new discord.MessageEmbed()
					.setTitle(`${msg.member.user.username} Has given a sandwich to ${msg.mentions.members.first().user.username}`)
					.setColor([255, 0, 0])
					.setImage(sandwichImg));

				SocialModel.findOne({ id: msg.mentions.members.first().id }, (err, social: SocialClass) => {
					if (err) throw err;

					if (social == undefined || social == null)
						social = createProfile(msg.mentions.members.first().id)

					social = SocialCheckUndefineds(social);

					social.set('sandwichs', social.sandwichs + 1);
					social.save();
				})

			}
		} else {
			msg.channel.send(new discord.MessageEmbed()
				.setColor([255, 0, 0])
				.addField(`Help`, `Check \`${prefix}help sandwich\``)
				.setDescription(`Please specify an user!`));
		}
	}
}