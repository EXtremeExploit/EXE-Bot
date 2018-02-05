//#region JSON
const main = new (require('../')).Main();
const json = main.getJson();
//#endregion

//#region Settings
class Data {
    token() {
        //#region Token
        var htoken = process.env.token;
        if (htoken) {
            json.token = htoken;
        } else {
            json.token = json.token;
        }
        //#endregion
        return json.token;
    }
    prefix() {
        //#region Prefix
        var hprefix = process.env.prefix;
        if (hprefix) {
            json.prefix = hprefix;
        } else {
            json.prefix = json.prefix;
        }
        //#endregion
        return json.prefix;
    }
    osuApiKey() {
        //#region Osu!API Key
        var hosuapikey = process.env.osuApiKey;
        if (hosuapikey) {
            json.osuApiKey = hosuapikey;
        } else {
            json.osuApiKey = json.osuApiKey;
        }
        //#endregion
        return json.osuApiKey;
    }
    owner() {
        //#region ID
        var hid = process.env.owner_id;
        if (hid) {
            json.owner.id = hid;
        } else {
            json.owner.id = json.owner.id;
        }
        //#endregion
        //#region Discriminator
        var hdiscriminator = process.env.owner_discriminator;
        if (hdiscriminator) {
            json.owner.discriminator = hdiscriminator;
        } else {
            json.owner.discriminator = json.owner.discriminator;
        }
        //#endregion
        //#region Username
        var husername = process.env.owner_username;
        if (husername) {
            json.owner.username = husername;
        } else {
            json.owner.username = json.owner.username;
        }
        //#endregion
        //#region Tag
        var htag = process.env.owner_tag;
        if (htag) {
            json.owner.tag = htag;
        } else {
            json.owner.tag = json.owner.tag;
        }
        //#endregion
        return json.owner;
    }
    allEvents() {
        //#region All Events
        var hallevents = process.env.allEvents;
        if (hallevents) {
            json.allEvents = hallevents;
        } else {
            json.allEvents = json.allEvents;
        }
        //#endregion
        return json.allEvents;
    }
    debug() {
        //#region Debug
        var hdebug = process.env.debug;
        if (hdebug) {
            json.debug = hdebug;
        } else {
            json.debug = json.debug;
        }
        //#endregion
        return json.debug;
    }
    wikisEnabled() {
        return json.wikisEnabled;
    }
    wikis() {
        return json.wikis;
    }
    commands() {
        //#region Voice
        var hVoice = process.env.commands_categories_Voice;
        if (hVoice) {
            json.commands.categories.Voice = hVoice;
        } else {
            json.commands.categories.Voice = json.commands.categories.Voice;
        }
        //#endregion
        //#region Support
        var hSupport = process.env.commands_categories_Support;
        if (hSupport) {
            json.commands.categories.Support = hSupport;
        } else {
            json.commands.categories.Support = json.commands.categories.Support;
        }
        //#endregion
        //#region Info
        var hInfo = process.env.commands_categories_Info;
        if (hInfo) {
            json.commands.categories.Info = hInfo;
        } else {
            json.commands.categories.Info = json.commands.categories.Info;
        }
        //#endregion
        //#region Random
        var hRandom = process.env.commands_categories_Random;
        if (hRandom) {
            json.commands.categories.Random = hRandom;
        } else {
            json.commands.categories.Random = json.commands.categories.Random;
        }
        //#endregion
        //#region Moderation
        var hModeration = process.env.commands_categories_Moderation;
        if (hModeration) {
            json.commands.categories.Moderation = hModeration;
        } else {
            json.commands.categories.Moderation = json.commands.categories.Moderation;
        }
        //#endregion
        //#region Fun
        var hFun = process.env.commands_categories_Fun;
        if (hFun) {
            json.commands.categories.Fun = hFun;
        } else {
            json.commands.categories.Fun = json.commands.categories.Fun;
        }
        //#endregion
        //#region Osu
        var hOsu = process.env.commands_categories_Osu;
        if (hOsu) {
            json.commands.categories.Osu = hOsu;
        } else {
            json.commands.categories.Osu = json.commands.categories.Osu;
        }
        //#endregion
        //#region Misc
        var hMisc = process.env.commands_categories_Misc;
        if (hMisc) {
            json.commands.categories.Misc = hMisc;
        } else {
            json.commands.categories.Misc = json.commands.categories.Misc;
        }
        //#endregion
        //#region Wiki
        var hWiki = process.env.commands_categories_Wiki;
        if (hWiki) {
            json.commands.categories.Wiki = hWiki;
        } else {
            json.commands.categories.Wiki = json.commands.categories.Wiki;
        }
        //#endregion
        //#region Bot Owner
        var hBotOwner = process.env.commands_categories_BotOwner;
        if (hBotOwner) {
            json.commands.categories.BotOwner = hBotOwner;
        } else {
            json.commands.categories.BotOwner = json.commands.categories.BotOwner;
        }
        //#endregion
        return json.commands;
    }
    maintance() {
        //#region Maintance
        var hMaintance = process.env.maintance;
        if (hMaintance) {
            json.maintance = hMaintance;
        } else {
            json.maintance = json.maintance;
        }
        //#endregion
        return json.maintance;
    }
    replies() {
        //#region Standard
        var hStandard = process.env.replies_standard;
        if (hStandard) {
            json.replies.standard = hStandard;
        } else {
            json.replies.standard = json.replies.standard;
        }
        //#endregion
        //#region Osu
        var hOsu = process.env.replies_osu;
        if (hOsu) {
            json.replies.osu = hOsu;
        } else {
            json.replies.osu = json.replies.osu;
        }
        //#endregion
        return json.replies;
    }
    servers(){
        return {};
    }
}
//#endregion

exports.Data = Data;
