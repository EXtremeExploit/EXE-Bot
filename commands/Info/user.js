const main = require('../commands').Main;
const functions = main.getFunctions();

const discord = require('discord.js');
const { Message, Client } = discord;
class user {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client 
	 */
	constructor(msg, client) {

		var user = (msg.mentions.members.first()) ? (msg.mentions.members.first()) : (msg.member);


		if (user.presence.status == 'online') user.presence.status = 'Online';
		else if (user.presence.status == 'dnd') user.presence.status = 'Do Not Disturb';
		else if (user.presence.status == 'idle') user.presence.status = 'AFK';
		else if (user.presence.status == 'offline') user.presence.status = 'Offline/Disconnected';
		if (user.presence.game == null) user.presence.game = {
			name: '*null*',
			streaming: false,
			type: 0,
			url: null
		};

		var ct = functions.convertMS(new Date() - user.user.createdTimestamp);
		var jt = functions.convertMS(new Date() - user.joinedTimestamp);

		msg.channel.send(new discord.RichEmbed()
			.setDescription(`${user.user.username} info`)
			.setColor([255, 0, 0])
			.addField('Full Username', user.user.tag, true)
			.addField('ID', user.id, true)
			.addField('Roles', '**Hoist:** ' + user.hoistRole + '\n' +
				'**Highest:** ' + user.highestRole + '\n' +
				'**Color:** ' + user.colorRole, true)
			.addField('Presence', '**Playing:** ' + user.presence.game.name + '\n' +
				'**Streaming:** ' + user.presence.game.streaming + '\n' +
				'**Status:** ' + user.presence.status, true)
			.addField('Dates', '**Created:** ' + user.user.createdAt.getUTCFullYear() + '/' + (user.user.createdAt.getUTCMonth() + 1) + '/' + user.user.createdAt.getUTCDate() + ' @ ' + user.user.createdAt.getUTCHours() + ':' + user.user.createdAt.getUTCMinutes() + ':' + user.user.createdAt.getUTCSeconds() + ' UTC (' + ct.days + ' days, ' + ct.hours + ' hours, ' + ct.minutes + ' minutes, ' + ct.seconds + ' seconds ago)' + '\n' +
				'**Joined:** ' + user.joinedAt.getUTCFullYear() + '/' + (user.joinedAt.getUTCMonth() + 1) + '/' + user.joinedAt.getUTCDate() + ' @ ' + user.joinedAt.getUTCHours() + ':' + user.joinedAt.getUTCMinutes() + ':' + user.joinedAt.getUTCSeconds() + ' UTC (' + jt.days + ' days, ' + jt.hours + ' hours, ' + jt.minutes + ' minutes, ' + jt.seconds + ' seconds ago)', true)
			.addField('Bot', user.user.bot, true)
			.addField('Avatar', '**Avatar Hash:** ' + user.user.avatar + '\n' +
				'**AvatarURL:** ' + user.user.displayAvatarURL, true)
			.setAuthor(user.user.username, user.user.displayAvatarURL)
			.setThumbnail(user.user.displayAvatarURL));
	}
}
module.exports = user;
