const discord = require('discord.js');
const { Client } = discord;

//#region Events
class Events {
	/**
	 * Returns all the client events
	 * @param {Client} client 
	 */
	constructor(client) {
		var main = new (require('./scripts')).Main();
		this.data = main.getData();
		this.prefix = this.data.prefix();
		this.client = client;
	}
	ready() {
		this.client.on('ready', () => {
			var me = this.client.user;
			this.client.setInterval(() => {
				switch (this.data.maintance()) {
					case true:
					case 'true':
						me.setPresence({
							status: 'dnd',
							afk: false,
							game: {
								name: this.prefix + 'help | ' + this.prefix + 'invite | S: ' + this.client.guilds.array().length,
								type: 'WATCHING'
							}
						});
						break;
					case false:
					case 'false':
						me.setPresence({
							status: 'online',
							afk: false,
							game: {
								name: this.prefix + 'help | ' + this.prefix + 'invite | S: ' + this.client.guilds.array().length,
								url: 'https://www.twitch.tv/extremeexploit_',
								type: 'STREAMING'
							},
						});
						break;
				}
			}, 30000);
			console.log('==================================================');
			console.log('JavaScript, Node.JS ' + process.version + ', discord.js v' + discord.version);
			console.log('User: ' + me.id + '/' + me.tag);
			console.log('Owner: ' + this.data.owner().id + '/' + this.data.owner().tag);
			console.log('Prefix / Servers: ' + this.prefix + ' / ' + this.client.guilds.array().length + ' Servers');
			console.log('==================================================');
		});
	}
	disconnect() {
		this.client.on('disconnect', () => console.log('[ ' + new Date + ' ] [DISCONNECTED]'));
	}
	reconnecting() {
		this.client.on('reconnecting', () => console.log('[ ' + new Date + ' ] [RECONNECTING...]'));
	}
	channelCreate() {
		this.client.on('channelCreate', () => console.log('[ ' + new Date() + ' ] [CHANNEL_CREATE]'));
	}
	channelDelete() {
		this.client.on('channelDelete', () => console.log('[ ' + new Date() + ' ] [CHANNEL_DELETE]'));
	}
	channelPinsUpdate() {
		this.client.on('channelPinsUpdate', () => console.log('[ ' + new Date() + ' ] [CHANNEL_PINS_UPDATE]'));
	}
	channelUpdate() {
		this.client.on('channelUpdate', () => console.log('[ ' + new Date() + ' ] [CHANNEL_UPDATE]'));
	}
	clientUserGuildSettingsUpdate() {
		this.client.on('clientUserGuildSettingsUpdate', () => console.log('[ ' + new Date() + ' ] [CLIENT_USER_GUILD_SETTINGS_UPDATE]'));
	}
	clientUserSettingsUpdate() {
		this.client.on('clientUserSettingsUpdate', () => console.log('[ ' + new Date() + ' ] [CLIENT_USER_SETTINGS_UPDATE]'));
	}
	emojiCreate() {
		this.client.on('emojiCreate', () => console.log('[ ' + new Date() + ' ] [EMOJI_CREATE]'));
	}
	emojiDelete() {
		this.client.on('emojiDelete', () => console.log('[ ' + new Date() + ' ] [EMOJI_DELETE]'));
	}
	emojiUpdate() {
		this.client.on('emojiUpdate', () => console.log('[ ' + new Date() + ' ] [EMOJI_UPDATE]'));
	}
	guildBanAdd() {
		this.client.on('guildBanAdd', () => console.log('[ ' + new Date() + ' ] [GUILD_BAN_ADD]'));
	}
	guildBanRemove() {
		this.client.on('guildBanRemove', () => console.log('[ ' + new Date() + ' ] [GUILD_BAN_REMOVE]'));
	}
	guildCreate() {
		this.client.on('guildCreate', () => console.log('[ ' + new Date() + ' ] [GUILD_CREATE]'));
	}
	guildMemberAdd() {
		this.client.on('guildMemberAdd', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_ADD]'));
	}
	guildMemberAvailable() {
		this.client.on('guildMemberAvailable', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_AVAILABLE]'));
	}
	guildMemberRemove() {
		this.client.on('guildMemberRemove', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_REMOVE]'));
	}
	guildMembersChunk() {
		this.client.on('guildMembersChunk', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_CHUNK]'));
	}
	guildMemberSpeaking() {
		this.client.on('guildMemberSpeaking', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_SPEAKING]'));
	}
	guildMemberUpdate() {
		this.client.on('guildMemberUpdate', () => console.log('[ ' + new Date() + ' ] [GUILD_MEMBER_UPDATE]'));
	}
	guildUnavailable() {
		this.client.on('guildUnavailable', () => console.log('[ ' + new Date() + ' ] [GUILD_UNAVAILABLE]'));
	}
	guildUpdate() {
		this.client.on('guildUpdate', () => console.log('[ ' + new Date() + ' ] [GUILD_UPDATE]'));
	}
	messageDelete() {
		this.client.on('messageDelete', () => console.log('[ ' + new Date() + ' ] [MESSAGE_DELETE]'));
	}
	messageDeleteBulk() {
		this.client.on('messageDeleteBulk', () => console.log('[ ' + new Date() + ' ] [MESSAGE_DELETE_BULK]'));
	}
	messageReactionAdd() {
		this.client.on('messageReactionAdd', () => console.log('[ ' + new Date() + ' ] [MESSAGE_REACTION_ADD]'));
	}
	messageReactionRemove() {
		this.client.on('messageReactionRemove', () => console.log('[ ' + new Date() + ' ] [MESSAGE_REACTION_REMOVE]'));
	}
	messageReactionRemoveAll() {
		this.client.on('messageReactionRemoveAll', () => console.log('[ ' + new Date() + ' ] [MESSAGE_REACTION_REMOVE_ALL]'));
	}
	messageUpdate() {
		this.client.on('messageUpdate', () => console.log('[ ' + new Date() + ' ] [MESSAGE_UPDATE]'));
	}
	presenceUpdate() {
		this.client.on('presenceUpdate', () => console.log('[ ' + new Date() + ' ] [PRESENCE_UPDATE]'));
	}
	resume() {
		this.client.on('resume', () => console.log('[ ' + new Date() + ' ] [RESUME]'));
	}
	roleCreate() {
		this.client.on('roleCreate', () => console.log('[ ' + new Date() + ' ] [ROLE_CREATE]'));
	}
	roleDelete() {
		this.client.on('roleDelete', () => console.log('[ ' + new Date() + ' ] [ROLE_DELETE]'));
	}
	roleUpdate() {
		this.client.on('roleUpdate', () => console.log('[ ' + new Date() + ' ] [ROLE_UPDATE]'));
	}
	typingStart() {
		this.client.on('typingStart', () => console.log('[ ' + new Date() + ' ] [TYPING_START]'));
	}
	typingStop() {
		this.client.on('typingStop', () => console.log('[ ' + new Date() + ' ] [TYPING_STOP]'));
	}
	userNoteUpdate() {
		this.client.on('userNoteUpdate', () => console.log('[ ' + new Date() + ' ] [USER_NOTE_UPDATE]'));
	}
	userUpdate() {
		this.client.on('userUpdate', () => console.log('[ ' + new Date() + ' ] [USER_UPDATE]'));
	}
	voiceStateUpdate() {
		this.client.on('voiceStateUpdate', () => console.log('[ ' + new Date() + ' ] [VOICE_STATE_UPDATE]'));
	}
	rateLimit() {
		this.client.on('rateLimit', (e) => {
			console.log('====================RATE LIMIT====================');
			console.log('Method: ' + e.method);
			console.log('Path: ' + e.path);
			console.log('Request Limit: ' + e.requestLimit);
			console.log('Time Difference: ' + e.timeDifference);
			console.log('==================================================');
		});
	}
	warn() {
		this.client.on('warn', (info) => {
			console.log('====================WARN====================');
			console.warn(info);
			console.log('============================================');
		});
	}
	all() {
		this.ready();
		this.disconnect();
		this.reconnecting();
		this.warn();
		this.error();
		this.rateLimit();
	}
	error() {
		this.client.on('error', (error) => {
			console.log('====================ERROR====================');
			console.log('Error Message: ' + error.message);
			console.log('Error Name: ' + error.name);
			console.log('Error Stack: ' + error.stack);
			console.log('=============================================');
		});
	}
}
//#endregion

exports.Events = Events;
