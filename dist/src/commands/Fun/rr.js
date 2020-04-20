import discord from 'discord.js';
import config from '../../config.js';
let prefix = new config().GetPrefix();
export default class {
    constructor(client, msg) {
        if (new config().GetMemory().rr.channels.includes(msg.channel.id) == false) {
            this.msg = msg;
            let time_msg;
            this.participants = [];
            let embed_msg;
            msg.channel.send(`<@${msg.member.id}> started a russian roulette, you have 20 seconds to join with \`${prefix}rrjoin\`!`).then(async (message) => {
                time_msg = message;
                this.participants.push(msg.member.id);
                let mem = new config().GetMemory();
                mem.rr.channels.push(msg.channel.id);
                new config().WriteMemory(mem);
                let collector = new discord.MessageCollector(msg.channel, (message) => (message.content == prefix + `rrjoin`), {
                    time: 20000
                });
                let embed = new discord.MessageEmbed()
                    .setTitle(`Current Players: 1/25`)
                    .setColor(0xFF0000)
                    .setAuthor(`Russian Roulette`)
                    .setDescription(`<@${msg.member.id}>`);
                embed_msg = await msg.channel.send(embed);
                let timeleft = 15;
                let _interval = setInterval(interval, 5000);
                function interval() {
                    if (timeleft != 0) {
                        time_msg.edit(`<@${msg.member.id}> started a russian roulette, you have ${timeleft} seconds to join with \`${prefix}rrjoin\`!`);
                        timeleft -= 5;
                    }
                    else {
                        time_msg.edit(`<@${msg.member.id}> started a russian roulette, you can\`t join anymore because you were too slow to join :c`);
                        clearInterval(_interval);
                    }
                }
                collector.on(`collect`, (message, messages) => {
                    if (this.participants.length < 25) {
                        if (this.participants.includes(message.member.id) == false) {
                            this.participants.push(message.member.id);
                            let participants_text = ``;
                            this.participants.forEach((p, index) => {
                                participants_text += `<@${p}>\n`;
                            });
                            embed.setTitle(`Current Players: ${this.participants.length}/25`);
                            embed.setDescription(participants_text);
                            embed_msg.edit(embed);
                        }
                        else {
                            message.reply(`You are already participating!`);
                        }
                    }
                    else {
                        collector.stop(`full`);
                    }
                });
                collector.on(`end`, (collection, reason) => {
                    let _mem = new config().GetMemory();
                    _mem.rr.channels.findIndex((v, i) => {
                        _mem.rr.channels.splice(i);
                    });
                    new config().WriteMemory(_mem);
                    if (reason == `full`) {
                        time_msg.edit(`<@${msg.member.id}> started a russian roulette, you can\`t join anymore because you were too slow to join :c`);
                        clearInterval(_interval);
                        this.rounds();
                    }
                    if (reason == `time`) {
                        if (this.participants.length > 1) {
                            this.rounds();
                        }
                        else {
                            msg.reply(`It seems that nobody want to play with you... But i can play with you, just start another one and type \`${prefix}say ${prefix}rrjoin\``);
                        }
                    }
                });
            });
        }
        else {
            msg.reply(`There is already a russian roulette in this channel!`);
        }
    }
    rounds() {
        let round_embed = new discord.MessageEmbed()
            .setAuthor(`Russian Roulette Rounds`)
            .setColor(0xFF0000);
        for (let n = 0; n < this.participants.length + n; n++) {
            let F = this.DecideWhoDies();
            let field_desc = ``;
            this.participants.forEach((v, i) => {
                field_desc += (i + 1) + `. <@${v}> ${v == F ? `Died` : `Survived`}\n`;
            });
            round_embed.addField(`Round ${(n + 1)}`, field_desc);
            let index = this.participants.indexOf(F);
            this.participants.splice(index, 1);
            if (this.participants.length == 1)
                break;
        }
        round_embed.addField(`Winner`, this.participants.length == 0 ? `` : `<@${this.participants[0]}>`);
        this.msg.channel.send(round_embed);
    }
    DecideWhoDies() {
        return this.participants[Math.floor(Math.random() * this.participants.length)];
    }
}
