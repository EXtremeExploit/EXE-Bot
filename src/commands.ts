import discord from 'discord.js';
import config, { ram } from './config.js';
import { CooldownCheckUndefineds, CooldownModel, CooldownsClass, createCooldown } from './util.js';
let prefix = new config().GetPrefix();
let owner = new config().GetOwner();

export class Command {
	name: string;
	category: Categories;
	aliases: string[];
	cooldown: number; // In seconds
	needsAsync: boolean;
	docs: CommandDoc;
	/**
	 * 
	 * @param name Command file name
	 * @param category Category or Folder Name
	 * @param aliases Aliases for which the command can get executed
	 * @param cooldown In Seconds
	 * @param needsAsync Uses async init() function
	 */
	constructor(name: string, category: Categories, aliases: string[], cooldown, needsAsync, docs: CommandDoc) {
		this.name = name;
		this.category = category;
		this.aliases = aliases;
		this.cooldown = cooldown;
		this.needsAsync = needsAsync;
		this.docs = docs;
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
		} catch (err1) {
			try {
				msg.channel.send(new discord.MessageEmbed()
					.setColor([255, 0, 0])
					.setTitle(`Error`)
					.setDescription(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!`)
					.setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));

				(await client.users.fetch(owner.id)).send(`\`\`\`${err1.stack}\`\`\``);

				console.error(err1);
			} catch (err2) {
				throw err2;
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
	new Command('clearcooldowns', Categories.BotOwner, ['clrcd', 'clrcds', 'clearcooldown'], 0, true, {
		args: 'no documentation for u',
		desc: 'no documentation for u',
		ex: 'no documentation for u'
	}),
	new Command(`disconnect`, Categories.BotOwner, ['dc'], 0, false, {
		args: 'no documentation for u',
		desc: 'no documentation for u',
		ex: 'no documentation for u'
	}),
	new Command(`eval`, Categories.BotOwner, [], 0, true, {
		args: 'no documentation for u',
		desc: 'no documentation for u',
		ex: 'no documentation for u'
	}),
	new Command(`logcmd`, Categories.BotOwner, ['logcmds'], 0, true, {
		args: 'no documentation for u',
		desc: 'no documentation for u',
		ex: 'no documentation for u'
	}),
	new Command(`exec`, Categories.BotOwner, ['execute'], 0, true, {
		args: 'no documentation for u',
		desc: 'no documentation for u',
		ex: 'no documentation for u'
	}),

	//Social
	new Command(`kill`, Categories.Social, [], 86400, true, {
		args: '<@Member>',
		ex: 'e!kill @User#0001',
		desc: 'Kill someone, doesn\'t mute or anything'
	}),
	new Command(`setalias`, Categories.Social, [], 45, true, {
		args: '<text>',
		ex: 'e!setalias TheLegend27',
		desc: 'Sets your alias or AKA, whatever'
	}),
	new Command(`setjob`, Categories.Social, [], 45, true, {
		args: '<text>',
		ex: 'e!setjob Anime girls reviewer',
		desc: 'Sets your job, you can even be a hentai reviewer!, isn\'t that awesome?'
	}),
	new Command(`work`, Categories.Social, ['w'], 28800, true, {
		args: 'x',
		ex: 'e!work',
		desc: 'Do your job, you get money, that soon you will be able to spend on bodypillows',
	}),
	new Command('profile', Categories.Social, ['p'], 0, false, {
		args: '[@Member]',
		ex: 'e!profile @User#0001',
		desc: 'Shows the profile of the user you mention or youself, flex those coinflips',
	}),
	new Command('rep', Categories.Social, ['reputation'], 86400, true, {
		args: '<@Member>',
		ex: 'e!rep @User#0001',
		desc: 'Give reputation to someone'
	}),


	//Fun
	new Command(`cookie`, Categories.Fun, [], 5, false, {
		args: '<@Member>',
		ex: 'e!cookie @User#0001',
		desc: 'Gives a cookie to someone'
	}),
	new Command(`dicksize`, Categories.Fun, [], 0, false, {
		args: '[@Member]',
		ex: 'e!dicksize @User#0001',
		desc: 'What\'s your penis lenght? ( ͡° ͜ʖ ͡°)',
	}),
	new Command(`jokes`, Categories.Fun, [], 0, false, {
		args: 'x',
		ex: 'e!jokes',
		desc: 'Bad jokes xd'
	}),
	new Command(`lenny`, Categories.Fun, [], 0, false, {
		args: 'x',
		ex: 'e!lenny',
		desc: 'Sends the lenny face'
	}),
	new Command(`owo`, Categories.Fun, [], 5, false, {
		args: 'x',
		ex: 'e!owo',
		desc: 'You go OwO'
	}),
	new Command(`pat`, Categories.Fun, [`headpat`], 0, false, {
		args: '<@Member>',
		ex: 'e!pat @User#0001',
		desc: 'Gives a headpat to someone'
	}),
	new Command(`reverse`, Categories.Fun, [], 0, false, {
		args: '<text>',
		ex: 'e!reverse very nice',
		desc: 'Returns the given text but reversed'
	}),
	new Command(`rps`, Categories.Fun, [], 0, false, {
		args: '<@Member>',
		ex: 'e!rps @User#0001',
		desc: 'Play Rock, Paper and Scissors'
	}),
	new Command(`rr`, Categories.Fun, [], 0, false, {
		args: '<@Member>',
		ex: 'e!rps @User#0001',
		desc: 'Play Russian Roulette'
	}),
	new Command(`sandwich`, Categories.Fun, [], 5, false, {
		args: '<@Member>',
		ex: 'e!sandwich @User#0001',
		desc: 'Gives a sandwich to someone'
	}),
	new Command(`say`, Categories.Fun, [], 3, false, {
		args: '<text>',
		ex: 'e!say òwó',
		desc: 'Says whatever you want'
	}),
	new Command(`touch`, Categories.Fun, [], 10, false, {
		args: '<@Member>',
		ex: 'e!touch @User#0001',
		desc: 'Touch someone'
	}),
	new Command(`waifu`, Categories.Fun, [], 0, false, {
		args: 'x',
		ex: 'e!waifu',
		desc: 'Waifu or laifu?'
	}),

	//Games
	new Command(`osu`, Categories.Games, [], 5, false, {
		args: '<osu!Username>\n[Modifiers]',
		ex: 'e!osu peppy --std --recent',
		desc: 'Retieves your profile, check Modifiers to learn more'
	}),

	//Info
	new Command(`avatar`, Categories.Info, [], 0, false, {
		args: '[@Member]',
		ex: 'e!avatar @User#0001',
		desc: 'Gets your/someone ‘s Avatar'
	}),
	new Command(`channel`, Categories.Info, [], 0, false, {
		args: '[#channel]',
		ex: 'e!channel',
		desc: 'Info about a channel'
	}),
	new Command(`emoji`, Categories.Info, [], 0, false, {
		args: '<Emoji>',
		ex: 'e!emoji :kappa:',
		desc: 'Info about an emoji'
	}),
	new Command(`role`, Categories.Info, [], 0, false, {
		args: '<Role>',
		ex: 'e!role @Admins',
		desc: 'Info about a role'
	}),
	new Command(`server`, Categories.Info, [], 0, false, {
		args: 'x',
		ex: 'e!server',
		desc: 'Info about the server'
	}),
	new Command(`user`, Categories.Info, [], 0, false, {
		args: '[@Member]',
		ex: 'e!user @User#0001',
		desc: 'Info about you/someone'
	}),

	//Misc
	new Command(`help`, Categories.Misc, [], 0, false, {
		args: '[Command or Category]',
		ex: 'e!help osu',
		desc: 'It displays a list of categories, if you provide a category name then it will give all the commands on that category, if command is given it will send command usage'
	}),
	new Command(`info`, Categories.Misc, ['neofetch'], 0, false, {
		args: 'x',
		ex: 'e!info',
		desc: 'Shows info about the bot, like RAM, servers and member count, etc. Aliases'
	}),
	new Command(`invite`, Categories.Misc, [], 5, false, {
		args: 'x',
		ex: 'e!invite',
		desc: 'Send the invitation link to add the bot to your server'
	}),
	new Command(`ping`, Categories.Misc, [], 5, false, {
		args: 'x',
		ex: 'e!ping',
		desc: 'Pings the bot and the Discord API'
	}),
	new Command(`pong`, Categories.Misc, [], 5, false, {
		args: 'x',
		ex: 'e!pong',
		desc: 'Pongs the bot and the Discord API'
	}),

	//Moderation
	new Command(`ban`, Categories.Moderation, [], 0, false, {
		args: '<@Member>',
		ex: 'e!ban @User#0001',
		desc: 'Bans someone'
	}),
	new Command(`kick`, Categories.Moderation, [], 0, false, {
		args: '<@Member>',
		ex: 'e!kick @User#0001',
		desc: 'Kicks someone'
	}),
	new Command(`mute`, Categories.Moderation, [], 0, false, {
		args: '<@Member>',
		ex: 'e!mute @User#0001',
		desc: 'Mutes someone'
	}),
	new Command(`prune`, Categories.Moderation, ['clean', 'bulk'], 0, false, {
		args: 'x',
		ex: 'e!prune 16',
		desc: 'Deletes a count of messages in a channel'
	}),
	new Command(`svcfg`, Categories.Moderation, ['serverconfig', 'svconfig', 'servercfg'], 10, true, {
		args: '<toggle-replies|...>',
		ex: 'e!svcfg toggle-replies',
		desc: 'Toggles some server configuration about the bot, for example replies'
	}),
	new Command(`unmute`, Categories.Moderation, [], 0, false, {
		args: '<@Member>',
		ex: 'e!unmute @User#0001',
		desc: 'Unmutes someone'
	}),

	//NSFW
	new Command(`danbooru`, Categories.NSFW, [], 5, false, {
		args: '[SearchTerms]',
		ex: 'e!danbooru touhou',
		desc: 'Searchs on danbooru with your terms, no blocked tags'
	}),
	new Command(`rule34`, Categories.NSFW, [`r34`], 5, false, {
		args: '[SearchTerms]',
		ex: 'e!rule34 touhou',
		desc: 'Searchs your terms on the rule34'
	}),

	//Random
	new Command(`8ball`, Categories.Random, [], 0, false, {
		args: '<question>',
		ex: 'e!8ball are traps gay?',
		desc: 'Asks the 8ball a question'
	}),
	new Command(`cat`, Categories.Random, [], 5, false, {
		args: 'x',
		ex: 'e!cat',
		desc: 'Gets a random cat image'
	}),
	new Command(`coinflip`, Categories.Random, [], 3, false, {
		args: 'x',
		ex: 'e!coinflip',
		desc: 'Flips a coin'
	}),
	new Command(`dice`, Categories.Random, [], 0, false, {
		args: 'x',
		ex: 'e!dice',
		desc: 'Rolls a dice'
	}),
	new Command(`dog`, Categories.Random, [], 5, false, {
		args: 'x',
		ex: 'e!dog',
		desc: 'Gets a random dog image'
	}),
	new Command(`rate`, Categories.Random, [], 0, false, {
		args: '<text>',
		ex: 'e!rate memes',
		desc: 'Rates something'
	}),
	new Command(`roll`, Categories.Random, [], 0, false, {
		args: 'x',
		ex: 'e!roll',
		desc: 'Rolls a number between 1 and 100'
	}),

	//Utility
	new Command(`image`, Categories.Utility, [`img`], 5, false, {
		args: '<SearchTerm>',
		ex: 'e!image Hifumi Takimoto',
		desc: 'Searches images from google'
	}),
	new Command(`math`, Categories.Utility, [], 0, false, {
		args: 'x',
		ex: 'e!math',
		desc: 'Does math, what else do you expect?'
	}),
	new Command(`shorturl`, Categories.Utility, [], 5, false, {
		args: '<text>',
		ex: 'e!shorturl https://www.youtube.com/watch?v=ARn5vjeQRVs',
		desc: 'Shortes the url given with is.gd'
	})
];


export class CommandDoc {
	args: string;
	ex: string;
	desc: string;
}

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