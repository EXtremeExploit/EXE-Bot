import discord from 'discord.js';
import config, { ram } from './config.js';
import { CooldownCheckUndefineds, CooldownModel, createCooldown } from './util.js';
let prefix = new config().GetPrefix();
let owner = new config().GetOwner();
class Command {
    /**
     *
     * @param name Command file name
     * @param category Category or Folder Name
     * @param aliases Aliases for which the command cand get executed
     * @param cooldown In Seconds
     * @param needsAsync Uses init() function
     */
    constructor(name, category, aliases = [], cooldown = 0, needsAsync = false) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.cooldown = cooldown;
        this.needsAsync = needsAsync;
    }
    //TODO: Add a way to reload commands whenever there is support to delete ES modules from memory 
    async Load(client, msg) {
        let catName = Categories[this.category];
        let cmdImport = await import(`./commands/${catName}/${this.name}.js`);
        let result = false;
        try {
            let cmd = new cmdImport.default(client, msg);
            if (this.needsAsync)
                result = await cmd.init();
            else
                result = true;
            if (this.cooldown != 0)
                if (result == true) {
                    let cd = await CooldownModel.findOne({ id: msg.author.id, command: this.name });
                    if (cd == null || cd == undefined)
                        cd = createCooldown(msg.author.id, this.name);
                    cd.set('time', Math.floor(Date.now() / 1000) + this.cooldown);
                    cd.save();
                }
            if (ram.cfg.logcmd) {
                console.log(`[${new Date().toUTCString()}] ${msg.author.tag}/${msg.author.id}; ${msg.content}`);
            }
        }
        catch (E) {
            try {
                msg.channel.send(new discord.MessageEmbed()
                    .setColor([255, 0, 0])
                    .setTitle(`Error`)
                    .setDescription(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!`)
                    .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
                (await client.users.fetch(owner.id)).send(`\`\`\`${E.stack}\`\`\``);
                console.error(E);
            }
            catch (E) {
                throw E;
            }
        }
    }
}
export var Categories;
(function (Categories) {
    Categories[Categories["BotOwner"] = 0] = "BotOwner";
    Categories[Categories["Social"] = 1] = "Social";
    Categories[Categories["Fun"] = 2] = "Fun";
    Categories[Categories["Games"] = 3] = "Games";
    Categories[Categories["Info"] = 4] = "Info";
    Categories[Categories["Misc"] = 5] = "Misc";
    Categories[Categories["Moderation"] = 6] = "Moderation";
    Categories[Categories["NSFW"] = 7] = "NSFW";
    Categories[Categories["Random"] = 8] = "Random";
    Categories[Categories["Utility"] = 9] = "Utility";
})(Categories || (Categories = {}));
export let commandsArray = [
    //Bot Owner
    new Command('clearcooldowns', Categories.BotOwner, ['clrcd', 'clrcds'], 0, true),
    new Command(`disconnect`, Categories.BotOwner, ['dc']),
    new Command(`eval`, Categories.BotOwner, [], 0, true),
    new Command(`logcmd`, Categories.BotOwner, ['logcmds'], 0, true),
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
    new Command(`osuBest`, Categories.Games),
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
    new Command(`prune`, Categories.Moderation),
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
    constructor(client) {
        this.client = client;
        this.client.on(`message`, async (msg) => {
            if (!msg.guild)
                return;
            if (msg.author.bot)
                return;
            if (!msg.content.startsWith(prefix))
                return;
            if (msg.channel.permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
                let command = msg.content.split(` `)[0].replace(prefix, ``);
                let c;
                for (c of commandsArray) {
                    if (c.name == command || c.aliases.includes(command)) {
                        if (c.cooldown != 0) {
                            let cd = await CooldownModel.findOne({ id: msg.author.id, command: c.name });
                            if (cd == null || cd == undefined) {
                                cd = createCooldown(msg.author.id, c.name);
                            }
                            cd = CooldownCheckUndefineds(cd);
                            if (cd.time > Math.floor(Date.now() / 1000)) {
                                let timeDifference = cd.time - Math.floor(Date.now() / 1000);
                                let hours = Math.floor(timeDifference / 60 / 60);
                                let minutes = Math.floor(timeDifference / 60) - (hours * 60);
                                let seconds = timeDifference % 60;
                                msg.reply(`You are using that command too fast!, try again in **${hours} Hours, ${minutes} Minutes and ${seconds} seconds...**`);
                                return;
                            }
                            else {
                                c.Load(client, msg);
                            }
                        }
                        else {
                            c.Load(client, msg);
                        }
                    }
                }
            }
        });
    }
}
