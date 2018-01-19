//#region Data
const main = new (require('../scripts/')).Main();
const data = main.getData();
var prefix = data.prefix();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};
//#endregion

//#region Require Modules
//#region Discord Module
const discord = require('discord.js');
const { Message, VoiceConnection } = require('discord.js');
//#endregion
//#region ytdl-core Module
const yt = require('ytdl-core');
//#endregion
//#endregion

//#region Voice Commands
class voiceCommands {
    /**
     * 
     * @param {Message} msg 
     * @param {any} servers 
     */
    constructor(msg, servers) {
        var messageArray = msg.content.split(' ');
        var command_prefix = messageArray[0];
        var args = messageArray.slice(1).join(' ');
        var command = command_prefix.replace(prefix, '');
        if (msg.author.bot) return;
        if (msg.channel.type == 'dm' || msg.channel.type == 'group') return;
        if (!command_prefix.startsWith(prefix)) return;

        //region Functions
        /**
         * @param {VoiceConnection} connection 
         * @param {Message} msg 
         */
        function play(connection, msg) {
            var server = servers[msg.guild.id];

            server.dispatcher = connection.playStream(yt(server.queue[0], { filter: 'audioonly' }));
            server.queue.shift();
            server.dispatcher.on('end', () => {
                if (server.queue[0]) {
                    play(connection, msg);
                } else {
                    connection.disconnect();
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('I left voice channel because the queue is empty'));
                }
            });
        }
        //#endregion

        //#region Commands
        switch (command) {
            case 'play':
                if (!args[0] || args == '') {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .addField('Help', 'Check the [wiki](' + wikis.commands + '#voice) for help!')
                        .setDescription('Pleace specify a link!'));
                    return;
                }

                if (!msg.member.voiceChannel) {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .addField('Help', 'Check the [wiki](' + wikis.commands + '#voice) for help!')
                        .setDescription('You must be in a voice channel first!'));
                    return;
                }

                if (!servers[msg.guild.id]) {
                    servers[msg.guild.id] = {
                        queue: []
                    }

                }

                var server = servers[msg.guild.id];

                server.queue.push(args);

                if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then((connection) => {
                    play(connection, msg);
                });
                break;

            case 'skip':
                var server = servers[msg.guild.id];
                if (server) {
                    if (server.dispatcher) {
                        if (server.queue.length == 0) {
                            server.dispatcher.end();
                            msg.channel.send(new discord.RichEmbed()
                                .setColor([255, 0, 0])
                                .setDescription('Skipped, and queue is empty, so i left the voice channel'));
                        } else {
                            server.dispatcher.end();
                            msg.channel.send(new discord.RichEmbed()
                                .setColor([255, 0, 0])
                                .setDescription('Skipped!'));
                        }
                    }
                } else {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('There isn\'t any song playing!'));
                }
                break;

            case 'stop':
                var server = servers[msg.guild.id];
                if (msg.guild.voiceConnection) {
                    msg.guild.voiceConnection.disconnect()
                    server.queue.length = 0;
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('Cleaned queue and disconnected from voice channel!'));

                } else {
                    msg.channel.send(new discord.RichEmbed()
                        .setColor([255, 0, 0])
                        .setDescription('I can\'t stop when i already stopped!'));
                }
                break;

            case 'queue':
                var serverqueue = servers[msg.guild.id].queue;
                if (!serverqueue.length == 0)
                    msg.channel.send(serverqueue);
                else
                    msg.channel.send('Nothing in the queue');
                break;
        }
        //#endregion
    }
}
//#endregion

module.exports = voiceCommands;
