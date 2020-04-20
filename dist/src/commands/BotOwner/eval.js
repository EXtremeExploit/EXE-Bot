import discord from 'discord.js';
import config from '../../config.js';
let owner = new config().GetOwner();
export default class {
    constructor(client, msg) {
        let args = msg.content.split(` `).slice(1).join(` `);
        if (msg.member.user.id == owner.id) {
            try {
                let evaled = eval(args);
                evaled = evaled;
                if (typeof evaled !== `string`)
                    evaled;
                import(`util`).then((e) => {
                    evaled = e.inspect(evaled);
                });
                msg.channel.send(new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .setTitle(`Eval Command`)
                    .addField(`Input`, `\`\`\`\n${args}\n\`\`\``)
                    .addField(`Output:`, `\`\`\`xl\n${evaled}\`\`\``));
            }
            catch (err) {
                msg.channel.send(new discord.MessageEmbed()
                    .setTitle(`ERROR`)
                    .setColor([255, 0, 0])
                    .setDescription(`\`\`\`xl\n${err}\`\`\``));
            }
        }
        else {
            msg.channel.send(new discord.MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Bot owner only!`)
                .setFooter(`how did you found this command?`));
        }
    }
}
