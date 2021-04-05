import discord from 'discord.js';
import config, { ram } from './config.js';
import { CooldownCheckUndefineds, CooldownModel, CooldownsClass, createCooldown } from './util.js';
let prefix = new config().GetPrefix();
let owner = new config().GetOwner();

class Command {
	name: string;
	category: Categories;
	aliases: string[];
	cooldown: number; // In seconds
	needsAsync: boolean;
	/**
	 * 
	 * @param name Command file name
	 * @param category Category or Folder Name
	 * @param aliases Aliases for which the command can get executed
	 * @param cooldown In Seconds
	 * @param needsAsync Uses async init() function
	 */
	constructor(name: string, category: Categories, aliases: string[] = [], cooldown = 0, needsAsync = false) {
		this.name = name;
		this.category = category;
		this.aliases = aliases;
		this.cooldown = cooldown;
		this.needsAsync = needsAsync;
	}

	//TODO: Add a way to reload commands whenever there is support to delete ES modules from memory 
	async Load(client: discord.Client, msg: discord.Message) {
		let catName: string = Categories[this.category];
		let cmdImport = await import(`./commands/${catName}/${this.name}.js`);
		let result = false;

		try {
			if (ram.cfg.logcmd) // Log CMD if it is enabled
				console.log(`[${new Date().toUTCString()}] ${msg.author.tag}/${msg.author.id}; ${msg.content}`);

			let cmd = new cmdImport.default(client, msg);

			if (this.needsAsync) //Use async if the command needs it
				result = await cmd.init();
			else
				result = true; //Sync commands don't actually return anything it always executes nicely so the result is always true

			if (this.cooldown != 0)
				if (result == true) {
					let cd: CooldownsClass = await CooldownModel.findOne({ id: msg.author.id, command: this.name });
					if (cd == null || cd == undefined)
						cd = createCooldown(msg.author.id, this.name);
					cd.set('time', Math.floor(Date.now() / 1000) + this.cooldown)
					cd.save();
				}
		} catch (E) {
			try {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Error`)
					.setDescription(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!`)
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));

				(await client.users.fetch(owner.id)).send(`\`\`\`${E.stack}\`\`\``);

				console.error(E);
			} catch (E) {
				throw E;
			}
		}
	}
}

export enum Categories {
	BotOwner = 0,
	Social,
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
	new Command('clearcooldowns', Categories.BotOwner, ['clrcd', 'clrcds'], 0, true),
	new Command(`disconnect`, Categories.BotOwner, ['dc']),
	new Command(`eval`, Categories.BotOwner, [], 0, true),
	new Command(`logcmd`, Categories.BotOwner, ['logcmds'], 0, true),
	new Command(`exec`, Categories.BotOwner, ['execute'], 0, true),

	//Social
	new Command(`kill`, Categories.Social, [], 86400, true),
	new Command(`setalias`, Categories.Social, [], 45, true),
	new Command(`setjob`, Categories.Social, [], 45, true),
	new Command(`work`, Categories.Social, ['w'], 28800, true),
	new Command('profile', Categories.Social, ['p']),
	new Command('rep', Categories.Social, ['reputation'], 86400, true),


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

	//Info
	new Command(`avatar`, Categories.Info),
	new Command(`channel`, Categories.Info),
	new Command(`emoji`, Categories.Info),
	new Command(`role`, Categories.Info),
	new Command(`server`, Categories.Info),
	new Command(`user`, Categories.Info),

	//Misc
	new Command(`help`, Categories.Misc),
	new Command(`info`, Categories.Misc, ['neofetch']),
	new Command(`invite`, Categories.Misc),
	new Command(`ping`, Categories.Misc),
	new Command(`pong`, Categories.Misc),
	new Command(`uptime`, Categories.Misc),
	new Command(`wikis`, Categories.Misc),

	//Moderation
	new Command(`ban`, Categories.Moderation),
	new Command(`kick`, Categories.Moderation),
	new Command(`mute`, Categories.Moderation),
	new Command(`prune`, Categories.Moderation, ['clean', 'bulk']),
	new Command(`svcfg`, Categories.Moderation, ['serverconfig', 'svconfig', 'servercfg'], 10, true),
	new Command(`unmute`, Categories.Moderation),

	//NSFW
	new Command(`danbooru`, Categories.NSFW),
	new Command(`rule34`, Categories.NSFW, [`r34`]),

	//Random
	new Command(`8ball`, Categories.Random),
	new Command(`cat`, Categories.Random),
	new Command(`coinflip`, Categories.Random, [], 3),
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
				let contentCommand = msg.content.split(` `)[0].replace(prefix, ``);

				let c = commandsArray.find((c) => c.name == contentCommand || c.aliases.includes(contentCommand));

				if (!c) return;

				if (c.cooldown != 0) { // If has cooldown
					let cd: CooldownsClass = await CooldownModel.findOne({ id: msg.author.id, command: c.name });
					if (cd == null || cd == undefined) { // User never used the command
						cd = createCooldown(msg.author.id, c.name);
					}
					cd = CooldownCheckUndefineds(cd);
					if (cd.time > Math.floor(Date.now() / 1000)) { //If UNIX Time of cooldown is higher than current time, he has cooldown
						let timeDifference = cd.time - Math.floor(Date.now() / 1000);

						let hours = Math.floor(timeDifference / 60 / 60);
						let minutes = Math.floor(timeDifference / 60) - (hours * 60);
						let seconds = timeDifference % 60;

						msg.reply(`You are using that command too fast!, try again in **${hours} Hours, ${minutes} Minutes and ${seconds} seconds...**`);
						return;
					} else { //If cooldown already passed
						c.Load(client, msg);
					}
				} else { // No Cooldown
					c.Load(client, msg);
				}
			}
		});
	}
}