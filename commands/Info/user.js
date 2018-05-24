const main = require('../index').Main;
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

        if (msg.mentions.members.first()) {
            var user = msg.mentions.members.first();
            msg.channel.send(functions.userInfo(user));
        } else {
            var user = msg.member;
            msg.channel.send(functions.userInfo(user));
        }
    }
}
module.exports = user;
