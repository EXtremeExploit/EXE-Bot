
class voiceCommands {
    constructor(command, prefix, msg, servers) {
        if(command == prefix + 'join') {
            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                  .then(connection => {
                    msg.channel.send(new discord.RichEmbed()
                    .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                    .setColor([255,0,0])
                    .setTitle('Join')
                    .setDescription('SUCCesfully joined to the channel!'));
                  })
                  .catch(console.log);
              } else {
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setAuthor(msg.member.user.username,msg.member.user.displayAvatarURL)
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('You need to join a voice channel first'));
              }
        }else if (command == prefix + 'play'){
            if(!msg.member.voiceChannel) {
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .addField('Help', 'Check the [wiki]('+wikis.commands+'#voice) for help!')
                .setDescription('You need to join a voice channel first'))
                return;
            }
    
            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }
    
            var server = servers[msg.guild.id];
            server.queue.push(args[0])
            if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(connection => {
                play(connection,msg);
            });
        }else if(command == prefix + 'skip'){
            var server = servers[msg.guild.id];
            
            if(server.dispatcher){
                server.dispatcher.end();
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Skipped!'));
            }
        }else if(command == prefix + 'stop'){
            var server = servers[msg.guild.id];
    
            if(msg.guild.voiceConnection) {
                msg.guild.voiceConnection.disconnect();
                msg.channel.send(new discord.RichEmbed()
                .setColor([255,0,0])
                .setDescription('Disconnected!'));

            }
        }
    }
}


function play(connection, msg) {
    var server = servers[msg.guild.id];

    server.dispatcher = connection.playStream(yt(server.queue[0], {filter: 'audioonly'}));

    server.queue.shift();

    server.dispatcher.on('end', () => {
        if(server.queue[0]) play(connection, msg);
        else connection.disconnect();
    });
}

module.exports = voiceCommands;
