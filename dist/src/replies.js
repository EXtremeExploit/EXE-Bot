import discord from 'discord.js';
import config from './config.js';
let wikis = new config().GetWikis();
class Reply {
    constructor(fileName, content, aliases = []) {
        this.content = content;
        this.fileName = fileName;
        this.aliases = aliases;
    }
    Load(client, msg) {
        import(`./replies/${this.fileName}.js`).then((e => {
            try {
                new e.default(client, msg);
            }
            catch (E) {
                try {
                    msg.channel.send(new discord.MessageEmbed()
                        .setColor([255, 0, 0])
                        .setTitle(`Error`)
                        .addField(`Help`, `Check the [wiki](${wikis.commands}#osu) for help!`)
                        .setDescription(`OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix!`)
                        .setAuthor(msg.member.user.username, msg.member.user.displayAvatarURL({ dynamic: true, size: 1024, format: `png` })));
                    console.error(E);
                }
                catch (E) {
                    throw E;
                }
            }
        }));
    }
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
        this.client.on(`message`, (msg) => {
            if (!msg.guild)
                return;
            if (msg.author.bot)
                return;
            if (msg.channel.permissionsFor(msg.guild.me).has(`SEND_MESSAGES`) == true) {
                let r;
                for (r of repliesArray) {
                    if (msg.content.toLowerCase() == r.content || r.aliases.includes(msg.content)) {
                        r.Load(client, msg);
                    }
                }
            }
        });
    }
}
