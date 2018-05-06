const main = require('../index').Main;
const functions = main.getFunctions();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
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
var sql = functions.connectToDatabase();

const discord = require('discord.js');
const { Message, Client } = discord;
class stats {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');

        var user;
        if (msg.mentions.members.first()) {
            user = msg.mentions.members.first();
        } else {
            user = msg.member;
        }

        sql.query(`SELECT * FROM cookies WHERE id = ${user.user.id}`, (err, cookies) => {
            if (err) throw err;
            sql.query(`SELECT * FROM sandwiches WHERE id = ${user.user.id}`, (err, sandwiches) => {
                if (err) throw err;


                var cookie;
                if (cookies.length < 1) {
                    cookie = 'This user doesn\'t have cookies :('
                } else {
                    cookie = cookies[0].cookies;
                }

                var sandwich;
                if (sandwiches.length < 1) {
                    sandwich = 'This user doesn\'t have sandwichs :('
                } else {
                    sandwich = sandwiches[0].sandwiches;
                }

                msg.channel.send(new discord.RichEmbed()
                    .setColor([0, 0, 255])
                    .setDescription('Stats from ' + user.user.username)
                    .addField('Food', '**Cookies:** ' + cookie + '\n' +
                        '**Sandwiches:** ' + sandwich)
                    .setAuthor(user.user.username, user.user.displayAvatarURL))
            })

        })
    }
}
module.exports = stats;
