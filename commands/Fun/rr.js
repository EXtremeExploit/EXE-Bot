const main = require('../commands').Main;

const discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { Message, Client } = discord;
class rr {
	/**
	 * 
	 * @param {Message} msg 
	 * @param {Client} client
	 */
	// eslint-disable-next-line no-unused-vars
	constructor(msg, client) {
		if (main.getMemory().rr.channels.includes(msg.channel.id) == false) {
			this.msg = msg;
			var time_msg = new discord.Message();
			this.participants = [];
			var embed_msg = new discord.RichEmbed();
			msg.channel.send('<@' + msg.member.id + '> started a russian roulette, you have 20 seconds to join with `' + main.getData().prefix() + 'rrjoin`!').then(async (message) => {
				time_msg = message;
				this.participants.push(msg.member.id);
				var mem = main.getMemory();
				mem.rr.channels.push(msg.channel.id);
				main.writeMemory(mem);
				var collector = new discord.MessageCollector(msg.channel, (message) => (message.content == main.getData().prefix() + 'rrjoin'), {
					time: 20000
				});

				var embed = new discord.RichEmbed()
					.setTitle('Current Players: 1/25')
					.setColor(0xFF0000)
					.setAuthor('Russian Roulette')
					.setDescription('<@' + msg.member.id + '>');
				embed_msg = await msg.channel.send(embed);
				var timeleft = 15;
				var _interval = setInterval(interval, 5000);
				// eslint-disable-next-line no-inner-declarations
				function interval() {
					if (timeleft != 0) {
						time_msg.edit('<@' + msg.member.id + '> started a russian roulette, you have ' + timeleft + ' seconds to join with `' + main.getData().prefix() + 'rrjoin`!');
						timeleft -= 5;
					} else {
						time_msg.edit('<@' + msg.member.id + '> started a russian roulette, you can\'t join anymore because you were too slow to join :c');
						clearInterval(_interval);
					}
				}

				// eslint-disable-next-line no-unused-vars
				collector.on('collect', (message, messages) => {
					if (this.participants.length < 25) {
						if (this.participants.includes(message.member.id) == false) {
							this.participants.push(message.member.id);
							var participants_text = '';
							// eslint-disable-next-line no-unused-vars
							this.participants.forEach((p, index) => {
								participants_text += '<@' + p + '>\n';
							});
							embed.setTitle('Current Players: ' + this.participants.length + '/25');
							embed.setDescription(participants_text);
							embed_msg.edit(embed);
						} else {
							message.reply('You are already participating!');
						}
					} else {
						collector.stop('full');
					}
				});

				collector.on('end', (collection, reason) => {
					var _mem = main.getMemory();
					_mem.rr.channels.findIndex((v, i) => {
						_mem.rr.channels.splice(i);
					});
					main.writeMemory(_mem);

					if (reason == 'full') {
						time_msg.edit('<@' + msg.member.id + '> started a russian roulette, you can\'t join anymore because you were too slow to join :c');
						clearInterval(_interval);
						this.rounds();
					}
					if (reason == 'time') {
						if (this.participants.length > 1) {
							this.rounds();
						} else {
							msg.reply('It seems that nobody want to play with you... But i can play with you, just start another one and type `' + main.getData().prefix() + 'say ' + main.getData().prefix() + 'rrjoin`');
						}
					}
				});
			});

		} else {
			msg.reply('There is already a russian roulette in this channel!');
		}
	}

	rounds() {
		var round_embed = new discord.RichEmbed()
			.setAuthor('Russian Roulette Rounds')
			.setColor(0xFF0000);
		for (var n = 0; n < this.participants.length + n; n++) {
			var F = this.DecideWhoDies();
			var field_desc = '';
			this.participants.forEach((v, i) => {
				field_desc += (i + 1) + '. <@' + v + '> ' + (v == F ? 'Died\n' : 'Survived\n');
			});
			round_embed.addField('Round ' + (n + 1), field_desc);

			var index = this.participants.indexOf(F);
			this.participants.splice(index, 1);
			if (this.participants.length == 1) break;
		}
		round_embed.addField('Winner', (this.participants.length == 0 ? '' : '<@' + this.participants[0] + '>'));
		this.msg.channel.send(round_embed);
	}


	DecideWhoDies() {
		return this.participants[Math.floor(Math.random() * this.participants.length)];
	}
}
module.exports = rr;
