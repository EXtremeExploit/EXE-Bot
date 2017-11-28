class customCode {
    constructor(client,discord) {

        client.on('presenceUpdate', (oldM,newM) => {
            if(newM.guild.id == 353336806189563904){
                if(newM.id == 257556050213994516){
                    if(!newM.presence.game == null && newM.presence.game.streaming){
                        client.fetchWebhook('383683910502187010').then(webhook => {
                            webhook.send(new discord.RichEmbed()
                            .setColor([100, 65, 164])
                            .setURL(newM.presence.game.url)
                            .setFooter('Streaming at Twitch! | extremeexploit_')
                            .setTimestamp(new Date().toUTCString())
                            .setTitle('<@257556050213994516> is streaming! Go to watch the stream!!! \n '+ newM.presence.game.url +'\n- @everyone -')
                        )})
                    }
                }
            }
            
        });

        
        client.on('presenceUpdate', (oldM,newM) => {
            if(newM.guild.id == 384165969892868097){
                if(newM.roles.find('id',384167042917335051)){
                    if(!newM.presence.game == null && newM.presence.game.streaming){
                        client.fetchWebhook('384169158390054915').then(webhook => {
                            webhook.send(new discord.RichEmbed()
                            .setColor([100, 65, 164])
                            .setURL(newM.presence.game.url)
                            .setFooter('Streaming at Twitch!')
                            .setTimestamp(new Date().toUTCString())
                            .setTitle('<@'+newM.user.id+'> is streaming! Go to watch the stream!!! \n '+ newM.presence.game.url +'\n- @everyone -')
                        )})
                    }
                }
            }
            
        });

        client.on('messageUpdate', (before,after) => {
            if(after.guild.id == 384165969892868097){
                client.fetchWebhook('384199108203642880').then(webhook =>{
                    webhook.send(new discord.RichEmbed()
                    .addField('Message Edited','Message by <@'+ after.author.id +'> on <#'+before.channel.id+'>')
                    .addField('Before', before.content)
                    .addField('After', after.content)
                )})
            }
        })

    }
}
module.exports = customCode;