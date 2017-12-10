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
                if(!server.queue == []) 
                    play(connection,msg);
                else 
                    connection.disconnect();
            });
            server.dispatcher.on('error', err => console.log(err))
            server.dispatcher.on('start', () =>{
                msg.channel.send('start')
            })
        }

        if (command == prefix + 'play'){
            if(!args[0] || args == ""){
                return msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('Pleace specify a link!'));
            }

            if(!msg.member.voiceChannel){
                return msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('You must be in a voice channel first!'));
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
            if(server.dispatcher) server.dispatcher.end();

        }else if(command == prefix + 'stop'){
            var server = servers[msg.guild.id];
            if(msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
        }
    }
}




module.exports = voiceCommands;
