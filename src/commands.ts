import discord from 'discord.js';
import config from './config.js'
let prefix = new config().GetPrefix();
let wikis = new config().GetWikis();


class Command {
	name: string;
	category: Categories;
	aliases: string[];
	constructor(name: string, category: Categories, aliases: string[] = []) {
		this.name = name;
		this.category = category;
		this.aliases = aliases;
	}

	//TODO: Add a way to reload commands whenever there is support to delete ES modules from memory 
	Load(client: discord.Client, msg: discord.Message) {
		let catName: string = Categories[this.category];
		import(`./commands/${catName}/${this.name}.js`).then((e => {
			try {
				new e.default(client, msg);
			} catch (E) {
				try {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Error`)
					.addField(`Help`, `Check the [wiki](${wikis.commands}#osu) for help!`)
					.setDescription(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!`)
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
					console.error(E);
				} catch(E){
					throw E;
				}
			}
		}));
	}
}

export enum Categories {
	BotOwner = 0,
	Fun,
	Games,
	Info,
	Misc,
	Moderation,
	NSFW,
	Random,
	Utility
}

export let commandsArray: Command[] = [
	//Bot Owner
	new Command(`disconnect`, Categories.BotOwner),
	new Command(`eval`, Categories.BotOwner),

	//Fun
	new Command(`cookie`, Categories.Fun),
	new Command(`dicksize`, Categories.Fun),
	new Command(`jokes`, Categories.Fun),
	new Command(`lenny`, Categories.Fun),
	new Command(`owo`, Categories.Fun),
	new Command(`pat`, Categories.Fun, [`headpat`]),
	new Command(`reverse`, Categories.Fun),
	new Command(`rps`, Categories.Fun),
	new Command(`rr`, Categories.Fun),
	new Command(`sandwich`, Categories.Fun),
	new Command(`say`, Categories.Fun),
	new Command(`touch`, Categories.Fun),
	new Command(`waifu`, Categories.Fun),

	//Games
	new Command(`osu`, Categories.Games),
	new Command(`osuBest`, Categories.Games),

	//Info
	new Command(`avatar`, Categories.Info),
	new Command(`channel`, Categories.Info),
	new Command(`emoji`, Categories.Info),
	new Command(`role`, Categories.Info),
	new Command(`server`, Categories.Info),
	new Command(`stats`, Categories.Info),
	new Command(`user`, Categories.Info),

	//Misc
	new Command(`help`, Categories.Misc),
	new Command(`info`, Categories.Misc),
	new Command(`invite`, Categories.Misc),
	new Command(`ping`, Categories.Misc),
	new Command(`pong`, Categories.Misc),
	new Command(`uptime`, Categories.Misc),
	new Command(`wikis`, Categories.Misc),

	//Moderation
	new Command(`ban`, Categories.Moderation),
	new Command(`kick`, Categories.Moderation),
	new Command(`mute`, Categories.Moderation),
	new Command(`prune`, Categories.Moderation),
	new Command(`unmute`, Categories.Moderation),

	//NSFW
	new Command(`danbooru`, Categories.NSFW),
	new Command(`rule34`, Categories.NSFW, [`r34`]),

	//Random
	new Command(`8ball`, Categories.Random),
	new Command(`cat`, Categories.Random),
	new Command(`coinflip`, Categories.Random),
	new Command(`dice`, Categories.Random),
	new Command(`dog`, Categories.Random),
	new Command(`rate`, Categories.Random),
	new Command(`roll`, Categories.Random),

	//Utility
	new Command(`image`, Categories.Utility, [`img`]),
	new Command(`math`, Categories.Utility),
	new Command(`shorturl`, Categories.Utility)
];

/**
 * Commands
 */
export default class {
	client: discord.Client;

	constructor(client: discord.Client) {
		this.client = client;

		this.client.on(`message`, async (msg: discord.Message) => {
			if (!msg.guild) return;
			if (msg.author.bot) return;

			if (!msg.content.startsWith(prefix)) return;
			if ((msg.channel as discord.GuildChannel).permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
				let command = msg.content.split(` `)[0].replace(prefix, ``);

				let c: Command;
				for (c of commandsArray) {
					if (c.name == command || c.aliases.includes(command)) {
						c.Load(client, msg);
					}
				}
			}
		});
	}
}