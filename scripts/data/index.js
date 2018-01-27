//#region JSON
const main = new (require('../')).Main();
const json = main.getJson();
//#endregion

//#region Settings
class Data {
    token() {
        var htoken = process.env.token;
        if (!htoken)
            return json.token;
        else
            return htoken;
    }
    prefix() {
        var hprefix = process.env.prefix;
        if (!hprefix)
            return json.prefix;
        else
            return hprefix;
    }
    osuApiKey() {
        var hosuapikey = process.env.osuApiKey;
        if (!hosuapikey)
            return json.osuApiKey;
        else
            return hosuapikey;
    }
    owner() {
        var hid = process.env.owner_id;
        if (hid) {
            json.owner.id = hid;
        } else {
            json.owner.id = json.owner.id;
        }

        var hdiscriminator = process.env.owner_discriminator;
        if (hdiscriminator) {
            json.owner.discriminator = hdiscriminator;
        } else {
            json.owner.discriminator = json.owner.discriminator;
        }

        var husername = process.env.owner_username;
        if (husername) {
            json.owner.username = husername;
        } else {
            json.owner.username = json.owner.username;
        }

        var htag = process.env.owner_tag;
        if (htag) {
            json.owner.tag = htag;
        } else {
            json.owner.tag = json.owner.tag;
        }
        return json.owner;
    }
    allEvents() {
        var hallevents = process.env.allEvents;
        if (!hallevents)
            return json.allEvents;
        else
            return hallevents;
    }
    debug() {
        var hdebug = process.env.debug;
        if (!hdebug)
            return json.debug;
        else
            return hdebug;
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
            json.commands.categories.Moderation = hFun;
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
}
//#endregion

exports.Data = Data;
