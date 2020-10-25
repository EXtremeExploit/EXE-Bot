import discord from 'discord.js';
import { ServerConfigModel, createServerConfig, ServerConfigCheckUndefineds } from '../../util.js';
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        let args = this.msg.content.split(` `).slice(1);
        if (args.join(` `).length < 2) {
            this.msg.reply('You need to pass some arguments to change...\n' +
                'You can check the wiki in `e!info` about arguments of this command.');
            return;
        }
        let servercfg = await ServerConfigModel.findOne({
            id: this.msg.guild.id
        });
        if (servercfg == undefined || servercfg == null)
            servercfg = createServerConfig(this.msg.guild.id);
        servercfg = ServerConfigCheckUndefineds(servercfg);
        let changelog = '';
        if (args.includes('toggle-replies')) {
            servercfg.set('repliesEnabled', (servercfg.repliesEnabled) ? false : true);
            changelog += `Replies are now \`${(servercfg.repliesEnabled) ? 'Enabled' : 'Disabled'}.\`\n`;
        }
        await servercfg.save();
        this.msg.channel.send(new discord.MessageEmbed()
            .setTitle(`Server configuration changelog`)
            .setDescription(changelog)
            .setColor([255, 0, 0]));
        return true;
    }
}
