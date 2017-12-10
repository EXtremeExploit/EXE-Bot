const yt          = require('ytdl-core');

class voiceCommands {
    constructor(prefix, msg, servers, discord, wikis) {

        
        var messageArray = msg.content.split(' ');
        var command = messageArray[0];
        var args = messageArray.slice(1).join(' ');

        function play(connection, msg) {
            var server = servers[msg.guild.id];

            server.dispatcher = connection.playStream(yt(server.queue[0], { filter: "audioonly"}));
            server.queue.shift();
            server.dispatcher.on('end', () => {
                if(server.queue[0]) 
                    play(connection,msg);
                else 
                    connection.disconnect();
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
                if(server.dispatcher) server.dispatcher.end().then(() => {
                    msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Skipped!'));
                });
            }else{
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('There isn\'t any song playing!'))
            }
            

        }else if(command == prefix + 'stop'){
            var server = servers[msg.guild.id];
            if(msg.guild.voiceConnection) {
                msg.guild.voiceConnection.disconnect().then(() => {
                    server.queue.length = 0;
                    msg.channel.send(new discord.RichEmbed()
                    .setColor([255,0,0])
                    .setDescription('Cleaned queue and disconnected from voice channel!'));
                });
            }else{
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('I can\'t stop when i already stopped!'));
            }
        }
    }
}

module.exports = voiceCommands;
