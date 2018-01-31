const _main = require('../index');
const main = new _main.Main();
const data = main.getData();
const token = data.token();
const osuApiKey = data.osuApiKey();
const discord = require('discord.js');
const { GuildMember, RichEmbed } = discord;

class Functions {
   constructor() { }
   /**
    * @param {string} text
    */
   clean(text) {
      if (typeof (text) == 'string')
         return text
            .replace(token, '*TOKEN*')
            .replace(osuApiKey, '*OSUAPIKEY*');
      else
         return text;
   }
   /**
    * @param {string} string 
    */
   reverseString(string) {
      var splitString = string.split('');
      var reverseArray = splitString.reverse();
      var joinArray = reverseArray.join('');
      return joinArray;
   }
   /**
    * @param {GuildMember} user
    */
   userInfo(user) {
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
      return new discord.RichEmbed()
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
         .addField('Created at', user.user.createdAt.toUTCString(), true)
         .addField('Joined at', user.joinedAt.toUTCString(), true)
         .addField('Bot', user.user.bot, true)
         .addField('Avatar', '**Avatar Hash:** ' + user.user.avatar + '\n' +
         '**AvatarURL:** ' + user.user.displayAvatarURL, true)
         .setAuthor(user.user.username, user.user.displayAvatarURL)
         .setThumbnail(user.user.displayAvatarURL);
   }
}
exports.Functions = Functions;
