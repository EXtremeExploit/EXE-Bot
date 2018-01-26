//#region JSON
const main = new (require('../')).Main();
const json = main.getJson();
//#endregion

//#region Settings
class Data {
    token() {
        var htoken = process.env.token
        if (!htoken)
            return json.token;
        else
            return htoken;
    }
    prefix() {
        var hprefix = process.env.prefix
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
        if (process.env.owner_id)
            json.owner.id = process.env.owner_id;

        if (process.env.owner_username)
            json.owner.id = process.env.owner_username;

        if (process.env.owner_discriminator)
            json.owner.id = process.env.owner_discriminator;

        if (process.env.owner_tag)
            json.owner.id = process.env.owner_tag;

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
        if (process.env.commands_categories_Voice == true)
            json.commands.categories.Voice = true;
        if (process.env.commands_categories_Voice == false)
            json.commands.categories.Voice = false;
        //#endregion
        //#region Support
        if (process.env.commands_categories_Support == true)
            json.commands.categories.Support = true;
        if (process.env.commands_categories_Support == false)
            json.commands.categories.Support = false;
        //#endregion
        //#region Info
        if (process.env.commands_categories_Info == true)
            json.commands.categories.Info = true;
        if (process.env.commands_categories_Info == false)
            json.commands.categories.Info = false;
        //#endregion
        //#region Random
        if (process.env.commands_categories_Random == true)
            json.commands.categories.Random = true;
        if (process.env.commands_categories_Random == false)
            json.commands.categories.Random = false;
        //#endregion
        //#region Moderation
        if (process.env.commands_categories_Moderation == true)
            json.commands.categories.Moderation = true;
        if (process.env.commands_categories_Moderation == false)
            json.commands.categories.Moderation = false;
        //#endregion
        //#region Fun
        if (process.env.commands_categories_Fun == true)
            json.commands.categories.Fun = true;
        if (process.env.commands_categories_Fun == false)
            json.commands.categories.Fun = false;
        //#endregion
        //#region Osu
        if (process.env.commands_categories_Osu == true)
            json.commands.categories.Osu = true;
        if (process.env.commands_categories_Osu == false)
            json.commands.categories.Osu = false;
        //#endregion
        //#region Misc
        if (process.env.commands_categories_Misc == true)
            json.commands.categories.Misc = true;
        if (process.env.commands_categories_Misc == false)
            json.commands.categories.Misc = false;
        //#endregion
        //#region Wiki
        if (process.env.commands_categories_Wiki == true)
            json.commands.categories.Wiki = true;
        if (process.env.commands_categories_Wiki == false)
            json.commands.categories.Wiki = false;
        //#endregion
        //#region Bot Owner
        if (process.env.commands_categories_BotOwner == true)
            json.commands.categories.BotOwner = true;
        if (process.env.commands_categories_BotOwner == false)
            json.commands.categories.BotOwner = false;
        //#endregion
        return json.commands;
    }
}
//#endregion

exports.Data = Data;
