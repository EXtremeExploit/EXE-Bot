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
const db = require('dblapi.js');
class BotOwner {
      /**
       * 
       * @param {Message} msg 
       * @param {Client} client 
       * @param {db} db
       */
      constructor(msg, client, db) {
            this.disconnect = require('./disconnect');
            this.eval = require('./eval');
            var messageArray = msg.content.split(' ');
            var command_prefix = messageArray[0];
            var args = messageArray.slice(1).join(' ');
            var command = command_prefix.replace(prefix, '');

            switch (command) {
                  case 'disconnect': return new this.disconnect(msg, client);
                  case 'eval': return new this.eval(msg, client, db);
            }
      }
}
module.exports = BotOwner;
