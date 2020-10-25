import discord from 'discord.js';
import config, { ram } from '../../config.js';
let prefix = new config().GetPrefix();
export default class {
    constructor(client, msg) {
        if (ram.rr.channels.includes(msg.channel.id) == true) {
            msg.reply(`There is already a russian roulette in this channel!`);
        }
        else {
            this.msg = msg;
            this.participants = [];
            let maxParticipants = 6;
            let msgTime;
            let msgParticipants;
            msg.channel.send(`<@${msg.member.id}> started a russian roulette, you have 20 seconds to join with \`${prefix}rrjoin\`!`).then(async (message) => {
                msgTime = message;
                this.participants.push(msg.member.id);
                ram.rr.channels.push(msg.channel.id);
                let collector = new discord.MessageCollector(msg.channel, (message) => (message.content == prefix + `rrjoin`), {
                    time: 20000
                });
                let embed = new discord.MessageEmbed()
                    .setTitle(`Current Players: 1/${maxParticipants}`)
                    .setColor(0xFF0000)
                    .setAuthor(`Russian Roulette`)
                    .setDescription(`<@${msg.member.id}>`);
                msgParticipants = await msg.channel.send(embed);
                let timeleft = 15;
                let _interval = setInterval(interval, 5000);
                function interval() {
                    if (timeleft != 0) {
                        msgTime.edit(`<@${msg.member.id}> started a russian roulette, you have ${timeleft} seconds to join with \`${prefix}rrjoin\`!`);
                        timeleft -= 5;
                    }
                    else {
                        msgTime.edit(`<@${msg.member.id}> started a russian roulette, you can\`t join anymore because you were too slow to join :c`);
                        clearInterval(_interval);
                    }
                }
                collector.on(`collect`, (message, messages) => {
                    if (this.participants.length < maxParticipants) {
                        if (this.participants.includes(message.member.id) == false) {
                            this.participants.push(message.member.id);
                            let participants_text = ``;
                            this.participants.forEach((p, index) => {
                                participants_text += `<@${p}>\n`;
                            });
                            embed.setTitle(`Current Players: ${this.participants.length}/${maxParticipants}`);
                            embed.setDescription(participants_text);
                            msgParticipants.edit(embed);
                            message.reply('Joined the roulette');
                            if (this.participants.length == 6)
                                collector.stop('full');
                        }
                        else {
                            message.reply(`You are already participating!`);
                        }
                    }
                    else {
                        collector.stop('full');
                    }
                });
                collector.on(`end`, (collection, reason) => {
                    ram.rr.channels.findIndex((v, i) => {
                        ram.rr.channels.splice(i);
                    });
                    if (reason == `full`) {
                        msgTime.edit(`<@${msg.member.id}> started a russian roulette, you can\`t join anymore because you were too slow to join :c`);
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
    }
    rounds() {
        let round_embed = new discord.MessageEmbed()
            .setAuthor(`Russian Roulette Rounds`)
            .setColor(0xFF0000);
        for (let n = 0; n < this.participants.length + n; n++) {
            let idOfDeadParticipant = this.DecideWhoDies();
            let field_desc = ``;
            this.participants.forEach((id, index) => {
                field_desc += `${index + 1}. <@${id}> ${id == idOfDeadParticipant ? 'Died' : 'Survived'}\n`;
            });
            round_embed.addField(`Round ${(n + 1)}`, field_desc);
            //Remove the dead one so it isn't in the next round
            let index = this.participants.indexOf(idOfDeadParticipant);
            this.participants.splice(index, 1);
            if (this.participants.length == 1)
                break;
        }
        round_embed.addField(`Winner`, `<@${this.participants[0]}>`);
        this.msg.channel.send(round_embed);
    }
    DecideWhoDies() {
        return this.participants[Math.floor(Math.random() * this.participants.length)];
    }
}
