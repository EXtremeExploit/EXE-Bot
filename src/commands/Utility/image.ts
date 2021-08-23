import discord, { MessageButton } from 'discord.js';
import config, { ram } from '../../config.js';
const googleKeys = new config().getGoogle();
import _gimages from 'google-images';
const gimages = new _gimages(googleKeys.cseID, googleKeys.appApiKey);

export default class {
	client: discord.Client;
	int: discord.CommandInteraction;
	constructor(client: discord.Client, int: discord.CommandInteraction) {
		this.client = client;
		this.int = int;
	}

	async init() {
		const query = this.int.options.getString('query');

		const images = await gimages.search(query, {
			safe: 'medium',
		});

		if (images.length == 0) {
			this.int.reply({
				content: 'Could not find any image on your search',
				ephemeral: true
			});
			return false;
		}

		const embed = new discord.MessageEmbed()
			.setColor([255, 0, 0])
			.setAuthor(this.int.user.username, this.int.user.displayAvatarURL({ size: 1024 }))
			.setDescription(`Displaying 1/${images.length} Images`)
			.setURL(images[0].url)
			.setImage(images[0].url)
			.setTitle('Google Image Search');


		const row = new discord.MessageActionRow()
			.addComponents([
				new MessageButton()
					.setCustomId('imagefirst')
					.setLabel('First')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('imageback')
					.setLabel('Back')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('imagenext')
					.setLabel('Next')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('imagelast')
					.setLabel('Last')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('imagestop')
					.setLabel('Stop')
					.setStyle('DANGER'),
			]);

		await this.int.reply(
			{
				embeds: [embed],
				components: [row]
			});

		const msgId = (await this.int.fetchReply()).id;

		ram.images.ints[msgId] = {
			index: 0,
			imgs: images,
			embed: embed
		};

		setTimeout(async () => {
			await this.int.editReply({
				components: []
			});
			delete ram.images.ints[msgId];
		}, 60 * 1000);
	}
}
