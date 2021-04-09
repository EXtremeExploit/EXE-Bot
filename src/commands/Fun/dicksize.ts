import discord from 'discord.js';

export default class {
	constructor(client: discord.Client, msg: discord.Message) {
		let xsmall = [
			`Life hates you.`,
			`Did you know that the ancient Greek considered small penises as a symbol of fertility?`,
			`At least it won't get any smaller.`,
			`What a cute little thing...`
		];

		let small = [
			`It's almost cute.`,
			`Well... it could have been worse...`,
			`I'm sorry about that.`,
			`Is that your finger?.`
		];

		let smedium = [
			`Seems like it's normal sized to me.`,
			`The average.`,
			`A decent size.`,
			`Something I would be ok with.`
		];

		let medium = [
			`You 're slightly above the average.`,
			`Good job.`,
			`To be honest it's not that impressive.`,
			`A little impressive.`,
			`Almost 4 oranges in size.`
		];

		let large = [`My horse is jealous.`,
			`This is something I would be proud of.`,
			`Almost as long as my arm.`,
			`Almost as long as my RTX 2080`
		];

		let xlarge = [
			`Keep that thing away from me! D:`,
			`You could knock down someone with that.`,
			`Do you sometimes bang it on the ceiling?`,
			`Don't trip over it.`,
			`Damn son.`,
			`What the fuck is that thing.`,
			`Did you born with a sexual leg?`
		];

		let member = (msg.mentions.members.first()) ? msg.mentions.members.first() : (msg.member);

		let length = Math.floor(Math.random() * (10 - 1 + 1) + 1);
		let str = `8`;
		for (let i = 0; i < length; i++)
			str += `=`;
		str += `D`;

		let comment: string;
		switch (true) {
			case length == 1: comment = xsmall[Math.floor(Math.random() * xsmall.length)]; break;
			case length <= 3: comment = small[Math.floor(Math.random() * small.length)]; break;
			case length <= 5: comment = smedium[Math.floor(Math.random() * smedium.length)]; break;
			case length <= 7: comment = medium[Math.floor(Math.random() * medium.length)]; break;
			case length <= 9: comment = large[Math.floor(Math.random() * large.length)]; break;
			case length == 10: comment = xlarge[Math.floor(Math.random() * xlarge.length)]; break;
		}

		let embed = new discord.MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` }))
			.setColor([255, 0, 0])
			.setTitle(`Dick Size: ${str} (${length})`)
			.setDescription(comment);

		msg.channel.send(embed);
	}
}