const main = new (require('../scripts/')).Main();
const data = main.getData();
var token = data.token();
var prefix = data.prefix();
var osuApiKey = data.osuApiKey();
var owner = data.owner();
var allEvents = data.allEvents();
var debug = data.debug();
const wikis = {
    home: data.wikis().home,
    commands: data.wikis().commands,
    replies: data.wikis().replies,
    faq: data.wikis().faq,
    isEnabled: data.wikisEnabled()
};
const _db = require('dblapi.js')
const { Message, Client } = require('discord.js');

class Commands {
    /**
     * @param {Client} client 
     * @param {_db} db
     */
    constructor(client, db) {
        this.client = client;
        this.db = db;
        this.botOwner = require('./Bot Owner/');
        this.fun = require('./Fun/');
        this.info = require('./Info/');
        this.misc = require('./Misc/');
        this.moderation = require('./Moderation/');
        this.nsfw = require('./NSFW/');
        this.osu = require('./Osu/');
        this.random = require('./Random/');
        this.support = require('./Support/');
        this.utility = require('./Utility/');
        this.voting = require('./Voting/');
    }
    BotOwner(msg) {
        return new this.botOwner(msg, this.client, this.db);
    }
    Fun(msg) {
        return new this.fun(msg, this.client);
    }
    Info(msg) {
        return new this.info(msg, this.client);
    }
    Misc(msg) {
        return new this.misc(msg, this.client);
    }
    NSFW(msg) {
        return new this.nsfw(msg, this.client);
    }
    Moderation(msg) {
        return new this.moderation(msg, this.client);
    }
    Osu(msg) {
        return new this.osu(msg, this.client);
    }
    Random(msg) {
        return new this.random(msg, this.client);
    }
    Support(msg) {
        return new this.support(msg, this.client);
    }
    Utility(msg) {
        return new this.utility(msg, this.client);
    }
    Voting(msg) {
        return new this.voting(msg, this.client, this.db);
    }
    /**
     * 
     * @param {Message} msg 
     */
    Load(msg) {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(prefix)) return;
        //#region Help Command Load
        var help = require('./Support/help');
        new help(this.client, msg);
        //#endregion
        if (data.commands().categories.Support == true || data.commands().categories.Support == 'true') {
            this.Support(msg);
        }
        if (data.commands().categories.Info == true || data.commands().categories.Info == 'true') {
            this.Info(msg);
        }
        if (data.commands().categories.Random == true || data.commands().categories.Random == 'true') {
            this.Random(msg);
        }
        if (data.commands().categories.Moderation == true || data.commands().categories.Moderation == 'true') {
            this.Moderation(msg);
        }
        if (data.commands().categories.NSFW == true || data.commands().categories.NSFW == 'true') {
            this.NSFW(msg);
        }

        if (data.commands().categories.Fun == true || data.commands().categories.Fun == 'true') {
            this.Fun(msg);
        }
        if (data.commands().categories.Osu == true || data.commands().categories.Osu == 'true') {
            this.Osu(msg);
        }
        if (data.commands().categories.Misc == true || data.commands().categories.Misc == 'true') {
            this.Misc(msg);
        }
        if (data.commands().categories.BotOwner == true || data.commands().categories.BotOwner == 'true') {
            this.BotOwner(msg);
        }
        if (data.commands().categories.Utility == true || data.commands().categories.Utility == 'true') {
            this.Utility(msg);
        }
        if (data.commands().categories.Voting == true || data.commands().categories.Voting == 'true') {
            this.Voting(msg);
        }
    }

}
exports.Commands = Commands;
exports.Main = main;
