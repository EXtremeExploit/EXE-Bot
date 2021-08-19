import discord from 'discord.js';
import config, { ram } from './config.js';
import { CooldownCheckUndefineds, CooldownModel, CooldownsClass, createCooldown, LOG_DATE } from './util.js';
const ownerId = new config().getOwnerId();

export class Command {
	name: string;
	category: string;
	cooldown: number; // In seconds
	description: string;
	args: discord.ApplicationCommandOptionData[];
	defaultPermission: boolean;
	/**
	 * 
	 * @param name Command file name
	 * @var name Command file name
	 * @param category Folder in which the file resides
	 * @param cooldown In Seconds
	 * @param description Description of what the command does
	 * @param args array of discord.ApplicationCommandOptionData for the command arguments
	 * @param defaultPermission: boolean of if the command is available for use on default
	 */
	constructor(name: string, category: string, cooldown, description: string, args: discord.ApplicationCommandOptionData[] = [], defaultPermission = true) {
		this.name = name;
		this.category = category;
		this.cooldown = cooldown;
		this.description = description;
		this.args = args;
		this.defaultPermission = defaultPermission;
	}

	// TODO: Add a way to reload commands whenever there is support to delete ES modules from memory 
	async Load(client: discord.Client, int: discord.CommandInteraction) {
		try {
			const cmd = new (await import(`./commands/${this.category}/${this.name}.js`)).default(client, int);
			if (ram.cfg.logcmd) // Log CMD if it is enabled
				console.log(`[${LOG_DATE()}] ${int.user.tag}/${int.user.id};${this.name}`);

			// Check if command has init function before running it to avoid accidental throw
			if (cmd.init == undefined || cmd.init == null)
				throw `Command ${this.category}/${this.name}.ts has no init function or does not exist`;
			const result: boolean = await cmd.init();

			if (this.cooldown != 0 && result) {
				let cd: CooldownsClass = await CooldownModel.findOne({ id: int.user.id, command: this.name });
				if (cd == null || cd == undefined)
					cd = createCooldown(int.user.id, this.name);
				cd.set('time', Math.floor(Date.now() / 1000) + this.cooldown);
				cd.save();
			}
		} catch (err1) {
			try {
				console.error(err1);

				int.reply({
					embeds: [new discord.MessageEmbed()
						.setColor([255, 0, 0])
						.setTitle('Error')
						.setDescription('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!')
						.setAuthor(int.user.username, int.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))]
				});

				(await client.users.fetch(ownerId)).send(`\`\`\`${err1.stack}\`\`\``);
			} catch (err2) {
				console.error(err2);
			}
		}
	}
}

export const commandsArray: Command[] = [
	// Bot Owner
	new Command('clearcooldowns', 'BotOwner', 0, 'Clear cooldowns of EVERYONE', []),
	new Command('disconnect', 'BotOwner', 0, 'Disconnect the bot', []),
	new Command('eval', 'BotOwner', 0, 'Evaluate JS code', [
		{
			description: 'Code to evaluate',
			name: 'code',
			type: 'STRING',
			required: true
		}
	]),
	new Command('logcmd', 'BotOwner', 0, 'Toggle logging of command runtime', []),
	new Command('exec', 'BotOwner', 0, 'Shell code to execute on host', [
		{
			description: 'Code to evaluate',
			name: 'code',
			type: 'STRING',
			required: true
		}
	]),

	// Fun
	new Command('cookie', 'Fun', 5, 'Give a cookie to someone', [
		{
			description: 'User to give a cookie',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('dicksize', 'Fun', 0, 'Get yours/others dicksize', [
		{
			description: 'User to know size',
			name: 'user',
			type: 'USER',
			required: false
		}
	]),
	new Command('owo', 'Fun', 5, 'Go owo'),
	new Command('pat', 'Fun', 0, 'Headpat someone', [
		{
			description: 'User to give a headpat',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('rps', 'Fun', 0, 'Play rock,paper and scissors', [
		{
			description: 'User to play with',
			name: 'user',
			type: 'USER',
			required: true,
		}
	]),
	new Command('rr', 'Fun', 0, 'Play Russian Roulette'),
	new Command('sandwich', 'Fun', 5, 'Give a sandwich to someone', [
		{
			description: 'User to give a sandwich',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('say', 'Fun', 3, 'Make the bot say anything', [
		{
			description: 'Text to say',
			name: 'text',
			type: 'STRING',
			required: true
		}
	]),
	new Command('waifu', 'Fun', 0, 'Waifu or laifu?'),

	// Games
	new Command('osu', 'Games', 5, 'Get an osu! user stats', [
		{
			description: 'osu! user name',
			name: 'username',
			type: 'STRING',
			required: true
		}, {
			description: 'What game mode to use',
			name: 'mode',
			choices: [
				{
					name: 'osu!',
					value: '0'
				}, {
					name: 'Taiko',
					value: '1',
				}, {
					name: 'Catch The Beat',
					value: '2',
				}, {
					name: 'Mania',
					value: '3',
				}
			],
			type: 'STRING',
			required: false,
		}, {
			description: 'Get best or recent scores',
			name: 'endpoint',
			choices: [{
				name: 'Best',
				value: 'best'
			}, {
				name: 'Recent',
				value: 'recent'
			}],
			type: 'STRING',
			required: false
		}
	]),

	// Info
	new Command('avatar', 'Info', 0, 'Get yours/others avatar', [
		{
			description: 'User to get avatar',
			name: 'user',
			type: 'USER',
			required: false
		}
	]),
	new Command('channel', 'Info', 0, 'Get info about a channel', [
		{
			description: 'Channel to fetch info',
			name: 'channel',
			type: 'CHANNEL',
			required: true
		}
	]),
	new Command('role', 'Info', 0, 'Get info about a role', [
		{
			description: 'role to fetch info',
			name: 'role',
			type: 'ROLE',
			required: true
		}
	]),
	new Command('server', 'Info', 0, 'Get info about the server'),
	new Command('user', 'Info', 0, 'Get info about a user', [
		{
			description: 'user to fetch info',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),

	// Misc
	new Command('info', 'Misc', 0, 'Shows info about the bot, like RAM, servers and member count, etc',),
	new Command('invite', 'Misc', 5, 'Send the invitation link'),
	new Command('ping', 'Misc', 5, 'Pings the bot and the Discord API'),
	new Command('pong', 'Misc', 5, 'Pongs the bot and the Discord API'),

	// Moderation
	new Command('ban', 'Moderation', 0, 'Ban someone', [
		{
			description: 'User to ban',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('kick', 'Moderation', 0, 'Kick someone', [
		{
			description: 'User to kick',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('prune', 'Moderation', 0, 'Deletes a certain ammount of messages', [
		{
			description: 'Number of messages to delete',
			name: 'ammount',
			type: 'INTEGER',
			required: true
		}
	]),

	// NSFW
	new Command('danbooru', 'NSFW', 5, 'Searchs on danbooru with your terms, no blocked tags', [
		{
			description: 'Query to request',
			name: 'query',
			type: 'STRING',
			required: true
		}
	]),
	new Command('rule34', 'NSFW', 5, 'Searchs your terms on the rule34', [
		{
			description: 'Query to request',
			name: 'query',
			type: 'STRING',
			required: true
		}
	]),

	// Random
	new Command('8ball', 'Random', 0, 'Asks the 8ball a question', [
		{
			description: 'Question to ask',
			name: 'question',
			type: 'STRING',
			required: true
		}
	]),
	new Command('cat', 'Random', 5, 'Gets a random cat image'),
	new Command('coinflip', 'Random', 3, 'Flip a coin'),
	new Command('dice', 'Random', 0, 'Roll a dice'),
	new Command('dog', 'Random', 5, 'Get a random dog image'),
	new Command('rate', 'Random', 0, 'Rate something', [
		{
			description: 'Thing to rate',
			name: 'thing',
			type: 'STRING',
			required: true
		}
	]),
	new Command('roll', 'Random', 0, 'Rolls a number between 1 and 100'),

	// Social
	new Command('kill', 'Social', 86400, 'Kill someone', [
		{
			description: 'User to kill',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),
	new Command('setalias', 'Social', 45, 'Change your alias', [
		{
			description: 'Your new alias',
			name: 'alias',
			type: 'STRING',
			required: true
		}
	]),
	new Command('setjob', 'Social', 45, 'Change your job', [
		{
			description: 'Your new job',
			name: 'job',
			type: 'STRING',
			required: true
		}
	]),
	new Command('work', 'Social', 28800, 'Get money by working'),
	new Command('profile', 'Social', 0, 'Display yours/others profile', [
		{
			description: 'User to fetch profile',
			name: 'user',
			type: 'USER',
			required: false
		}
	]),
	new Command('rep', 'Social', 86400, 'Give reputation to someone', [
		{
			description: 'User to give reputation',
			name: 'user',
			type: 'USER',
			required: true
		}
	]),

	// Utility
	new Command('image', 'Utility', 5, 'Searches images from google', [
		{
			description: 'What to search on google images',
			name: 'query',
			type: 'STRING',
			required: true
		}
	]),
	new Command('math', 'Utility', 0, 'Does math, what else do you expect?', [
		{
			description: 'Equation',
			name: 'query',
			type: 'STRING',
			required: true,
		}
	]),
	new Command('shorturl', 'Utility', 5, 'Shortes the url given with is.gd', [
		{
			description: 'URL to short',
			name: 'url',
			type: 'STRING',
			required: true
		}
	])
];

/**
 * Commands
 */
export default class {
	client: discord.Client;
	constructor(client: discord.Client) {
		this.client = client;

		this.client.on('interactionCreate', async (int: discord.CommandInteraction) => {
			if (!int.isCommand()) return;

			const c = commandsArray.find((c) => c.name == int.commandName);

			if (c.cooldown != 0) { // If command has cooldown
				let cd: CooldownsClass = await CooldownModel.findOne({ id: int.user.id, command: int.commandName });
				if (cd == null || cd == undefined) { // User never used the command
					cd = createCooldown(int.user.id, int.commandName);
				}
				cd = CooldownCheckUndefineds(cd);

				if (cd.time > Math.floor(Date.now() / 1000)) { // If UNIX Time of cooldown is higher than current time, he has cooldown
					const timeDifference = cd.time - Math.floor(Date.now() / 1000);

					const hours = Math.floor(timeDifference / 60 / 60);
					const minutes = Math.floor(timeDifference / 60) - (hours * 60);
					const seconds = timeDifference % 60;

					await int.reply({ content: `You are using that command too fast!, try again in **${hours} Hours, ${minutes} Minutes and ${seconds} seconds...**`, ephemeral: true });
					return;
				}
			}

			await c.Load(client, int);
		});
	}

	async register() {
		if (!this.client.application?.owner) await this.client.application?.fetch();

		const data: discord.ApplicationCommandData[] = [];
		for (let i = 0; i < commandsArray.length; i++) {
			const command = commandsArray[i];

			const obj: discord.ApplicationCommandData = {
				name: command.name,
				description: command.description,
				options: command.args,
				defaultPermission: command.defaultPermission
			};

			data.push(obj);
		}

		if (new config().useBeta() == 'true')
			await this.client.guilds.cache.get('411598333002514432').commands.set(data);
		else
			this.client.application?.commands.set(data);
	}
}
