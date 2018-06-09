const main = require('../index').Main;
const data = main.getData();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};

const discord = require('discord.js');
const { Message, Client } = discord;
class server {
    /**
     * 
     * @param {Message} msg 
     * @param {Client} client 
     */
    constructor(msg, client) {

        if (msg.guild.available) {
            if (msg.guild.verificationLevel == 0) {
                msg.guild.verificationLevel = 'None';
            }
            if (msg.guild.verificationLevel == 1) {
                msg.guild.verificationLevel = 'Low: Must have a verified e-mail on their Discord account';
            }
            if (msg.guild.verificationLevel == 2) {
                msg.guild.verificationLevel = 'Medium: Must have a verified e-mail and be registreder for longer than 5 minutes';
            }
            if (msg.guild.verificationLevel == 3) {
                msg.guild.verificationLevel = '(╯°□°）╯︵ ┻━┻: Must be in the server for longer than 10 minutes';
            }
            if (msg.guild.verificationLevel == 4) {
                msg.guild.verificationLevel = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻: Must have a phone on their discord account';
            }

            if (msg.guild.afkChannel == null || msg.guild.afkChannelID == null) {
                var afkchannelname = '*null*'
                msg.guild.afkChannelID = '*null*'
                msg.guild.afkTimeout = '*null*'
            } else {
                var afkchannelname = msg.guild.afkChannel.name;
            }


            var ct = functions.convertMS(new Date() - msg.guild.createdTimestamp);
            msg.channel.send(new discord.RichEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL)
                .setColor([0, 0, 255])
                .setThumbnail(msg.guild.iconURL)
                .addField('ID', msg.guild.id, true)
                .addField('Region', msg.guild.region, true)
                .addField('AFK', '**Channel** ' + afkchannelname + '\n' +
                    '**ChannelID:** ' + msg.guild.afkChannelID + '\n' +
                    '**Timeout(seconds):** ' + msg.guild.afkTimeout, true)
                .addField('Counts', '**Members:** ' + msg.guild.memberCount + '\n' +
                    '**Roles:** ' + msg.guild.roles.size, true)
                .addField('Owner', '**Owner:** ' + msg.guild.owner + '\n' +
                    '**OwnerID:** ' + msg.guild.ownerID, true)
                .addField('Dates', 'Creation: ' + msg.guild.createdAt.getUTCFullYear() + '/' + (msg.guild.createdAt.getUTCMonth() + 1) + '/' + msg.guild.createdAt.getUTCDate() + ' @ ' + msg.guild.createdAt.getUTCHours() + ':' + msg.guild.createdAt.getUTCMinutes() + ':' + msg.guild.createdAt.getUTCSeconds() + ' UTC (' + ct.days + ' days, ' + ct.hours + ' hours, ' + ct.minutes + ' minutes, ' + ct.seconds + ' seconds ago)')
                .addField('Verification Level', msg.guild.verificationLevel, true)
                .addField('Icon', '**Icon Hash:** ' + msg.guild.icon + '\n' +
                    '**Icon URL:** ' + msg.guild.iconURL, true));
        } else {
            msg.channel.send(new discord.RichEmbed()
                .setColor([255, 0, 0])
                .setDescription('Server not available'));
        }
    }
}
module.exports = server;
