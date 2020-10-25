import { ServerConfigModel, createServerConfig, ServerConfigCheckUndefineds } from './util.js';
import config from './config.js';
let prefix = new config().GetPrefix();
let owner = new config().GetOwner();
class Reply {
    constructor(fileName, content, aliases = []) {
        this.content = content;
        this.fileName = fileName;
        this.aliases = aliases;
    }
    async Load(client, msg) {
        try {
            let replImport = await import(`./replies/${this.fileName}.js`);
            let ServerConfig = await ServerConfigModel.findOne({ id: msg.guild.id });
            if (ServerConfig == null || ServerConfig == undefined)
                ServerConfig = createServerConfig(msg.guild.id);
            ServerConfig = ServerConfigCheckUndefineds(ServerConfig);
            if (ServerConfig.repliesEnabled) {
                new replImport.default(client, msg);
                if (!ServerConfig.hasSentAReply) {
                    msg.channel.send('It looks like this is the first reply i send into this server..\n' +
                        `You can disable them with \`${prefix}svcfg toggle-replies\``);
                    ServerConfig.set('hasSentAReply', true);
                    ServerConfig.save().catch((err) => {
                        throw err;
                    });
                }
            }
        }
        catch (E) {
            try {
                console.error(E);
                (await client.users.fetch(owner.id)).send(`\`\`\`${E.stack}\`\`\``);
            }
            catch (E) {
                throw E;
            }
        }
    }
    ;
}
export let repliesArray = [
    new Reply(`ayylmao`, `ayy`),
    new Reply(`back_o_forward`, `\\o/`),
    new Reply(`back_o_goq`, `\\o>`),
    new Reply(`back_o`, `\\o`),
    new Reply(`bruh`, `bruh`),
    new Reply(`expandDong`, `expand`),
    new Reply(`f`, `f`),
    new Reply(`loq_o_forward`, `<o/`),
    new Reply(`o_forward`, `o/`),
    new Reply(`omaewamoushindeiru_jp`, `お前はもう、死んでいる`, [`お前はもう死んでいる`]),
    new Reply(`omaewamoushindeiru`, `omae wa mou shindeiru`),
    new Reply(`owo`, `owo`),
    new Reply(`sauceNoKetchup`, `sauce`),
    new Reply(`topkek`, `top`),
];
export default class {
    constructor(client) {
        this.client = client;
        this.client.on(`message`, async (msg) => {
            if (!msg.guild)
                return;
            if (msg.author.bot)
                return;
            if (msg.channel.permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
                let r;
                for (r of repliesArray) {
                    if (msg.content.toLowerCase() == r.content || r.aliases.includes(msg.content)) {
                        await r.Load(client, msg);
                    }
                }
            }
        });
    }
}
