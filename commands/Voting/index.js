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
const db = require('dblapi.js');
const { Message, Client } = discord;
class Voting {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     * @param {db} db
     */
   constructor(msg, client, db) {
      this.rps = require('./rps');
      var messageArray = msg.content.split(' ');
      var command_prefix = messageArray[0];
      var args = messageArray.slice(1).join(' ');
      var command = command_prefix.replace(prefix, '');

      switch (command) {
         case 'rps':
            new this.rps(msg, client, db);
            break;
      }
   }
}
module.exports = Voting;
