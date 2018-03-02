const main = new (require('../scripts/')).Main();
const data = main.getData();
var osuApiKey = data.osuApiKey();
const functions = main.getFunctions();
const { Client } = require('discord.js');
const osuApi = require('osu.js').api(osuApiKey);
class OsuReplies {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        client.on('message', msg => {
            if (msg.content.startsWith('https://osu.ppy.sh/b/')) {
                var id = msg.content.split('/')[4];
                osuApi.getBeatmaps({
                    b: parseInt(id)
                }).then(bmF => {
                    msg.channel.send(functions.osuBeatmap(bmF));
                })
            }
            if (msg.content.startsWith('https://osu.ppy.sh/beatmapsets/')) {
                var id = msg.content.split('/')[5];
                osuApi.getBeatmaps({
                    b: parseInt(id)
                }).then(bmF => {
                    msg.channel.send(functions.osuBeatmap(bmF));
                })
            }
            if (msg.content.startsWith('https://osu.ppy.sh/u/') || msg.content.startsWith('https://osu.ppy.sh/users/')) {
                var id = msg.content.split('/')[4];
                osuApi.getUser({
                    u: id,
                    type: 'id',

                }).then(userF => {
                    msg.channel.send(functions.osuUser(userF));
                })
            }
        });
    }
}
module.exports = OsuReplies;
