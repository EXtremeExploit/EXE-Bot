import discord from 'discord.js';
import config, { ram } from '../../config.js';
let owner = new config().GetOwner();
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        let args = this.msg.content.split(` `).slice(1).join(` `);
        let oldValue = ram.cfg.logcmd;
        if (this.msg.member.user.id == owner.id) {
            switch (args) {
                case 'on':
                case 'true':
                    ram.cfg.logcmd = true;
                    break;
                case 'off':
                case 'false':
                    ram.cfg.logcmd = false;
                    break;
                default:
                    ram.cfg.logcmd = ram.cfg.logcmd == true ? false : true;
                    break;
            }
            this.msg.channel.send(new discord.MessageEmbed()
                .setColor(0xFF0000)
                .setDescription(`CMD LOG: ${oldValue} => ${ram.cfg.logcmd}`));
        }
        else {
            await this.msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Bot owner only!`)
                .setFooter(`how did you found this command?`));
        }
    }
}
