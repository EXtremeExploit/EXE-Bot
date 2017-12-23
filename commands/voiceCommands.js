const _data                                   = require('../scripts/data.js');
const data                                    = new _data();
var prefix                                    = data.prefix();

const discord                                 = require('discord.js');
const { Message, VoiceConnection }            = require('discord.js');
const yt                                      = require('ytdl-core');
const _wikis                                  = require('../scripts/wikis');
const wikis                                   = {
    home: new _wikis().home(),
    commands: new _wikis().commands(),
    replies: new _wikis().replies(),
    faq : new _wikis().faq(),
    isEnabled: new _wikis().isEnabled()
};

class voiceCommands {
    /**
     * 
     * @param {Message} msg 
     * @param {any} servers 
     */
    constructor(msg, servers) {

        
        var messageArray = msg.content.split(' ');
        var command = messageArray[0];
        var args = messageArray.slice(1).join(' ');


        var discordmessage = discord.Message;

        /**
         * @param {VoiceConnection} connection 
         * @param {Message} msg 
         */
        function play(connection, msg) {
            var server = servers[msg.guild.id];

            server.dispatcher = connection.playStream(yt(server.queue[0], { filter: "audioonly"}));
            server.queue.shift();
            server.dispatcher.on('end', () => {
                if(server.queue[0]){
                    play(connection,msg);
                }else{
                    connection.disconnect();
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setDescription('I left voice channel because the queue is empty'));
                }
            });
        }

        if (command == prefix + 'play'){
            if(!args[0] || args == ""){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('Pleace specify a link!'));
                return;
            }

            if(!msg.member.voiceChannel){
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('You must be in a voice channel first!'));
                return;
            }

            if(!servers[msg.guild.id]){
                servers[msg.guild.id] = {
                    queue: []
                }

            }

            var server = servers[msg.guild.id];

            server.queue.push(args);

            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then((connection) =>{
                play(connection, msg);
            });

        }else if(command == prefix + 'skip'){
            var server = servers[msg.guild.id];
            if(server){
                if(server.dispatcher) {
                    if(server.queue.length == 0){
                        server.dispatcher.end();
                        msg.channel.send(new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setDescription('Skipped, and queue is empty, so i left the voice channel'));
                    }else{
                        server.dispatcher.end();
                        msg.channel.send(new discord.RichEmbed()
                        .setColor([255,0,0])
                        .setDescription('Skipped!'));
                    }
                }
            }else{
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('There isn\'t any song playing!'));
            }
            

        }else if(command == prefix + 'stop'){
            var server = servers[msg.guild.id];
            if(msg.guild.voiceConnection) {
                msg.guild.voiceConnection.disconnect()
                server.queue.length = 0;
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Cleaned queue and disconnected from voice channel!'));
                
            }else{
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('I can\'t stop when i already stopped!'));
            }
        }else if(command == prefix + 'queue'){
            var serverqueue = servers[msg.guild.id].queue;
            if(!serverqueue.length == 0)
                msg.channel.send(serverqueue);
            else 
                msg.channel.send('Nothing in the queue')
        }
    }
}

module.exports = voiceCommands;
