import discord from 'discord.js';
import config from '../../config.js';
import util from 'util';
let owner = new config().GetOwner();
import { createRequire } from 'module';
import * as path from 'path';
import { URL } from 'url';
const __dirname = path.resolve();
const require = createRequire(new URL('file://' + __dirname + '/dist/src/commands/BotOwner/eval.js'));
export default class {
    constructor(client, msg) {
        this.client = client;
        this.msg = msg;
    }
    async init() {
        let args = this.msg.content.split(` `).slice(1).join(` `);
        if (this.msg.member.user.id == owner.id) {
            try {
                let evaled = eval(args);
                evaled = util.inspect(evaled);
                if (evaled.length >= 1023)
                    throw Error('Evaled is longer or equal to 1023');
                await this.msg.channel.send(new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .setTitle(`Eval Command`)
                    .addField(`Input`, `\`\`\`\n${args}\n\`\`\``)
                    .addField(`Output:`, `\`\`\`js\n${evaled}\`\`\``));
            }
            catch (err) {
                await this.msg.channel.send(new discord.MessageEmbed()
                    .setTitle(`ERROR`)
                    .setColor([255, 0, 0])
                    .setDescription(`\`\`\`\n${err}\`\`\``));
            }
        }
        else {
            await this.msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Bot owner only!`)
                .setFooter(`how did you found this command?`));
        }
    }
}
