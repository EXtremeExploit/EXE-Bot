const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};
const discord = require('discord.js');
const { Message, Client } = discord;
class Support {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
   constructor(msg, client) {
      this.info = require('./info');
      this.invite = require('./invite');
      var messageArray = msg.content.split(' ');
      var command_prefix = messageArray[0];
      var args = messageArray.slice(1).join(' ');
      var command = command_prefix.replace(prefix, '');
       return;
      switch (command) {
         case 'info':
            new this.info(msg, client);
            break;
        case 'invite':
            new this.invite(msg, client);
            break;
      }
   }
}
module.exports = Support;
