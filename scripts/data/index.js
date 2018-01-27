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
        if (hid){
            json.owner.id = hid;
        }else{
            json.owner.id = json.owner.id;
        }

        var hdiscriminator = process.env.owner_discriminator;
        if (hdiscriminator){
            json.owner.discriminator = hdiscriminator;
        }else{
            json.owner.discriminator = json.owner.discriminator;
        }
        
        var husername = process.env.owner_username;
        if (husername){
            json.owner.username = husername;
        }else{
            json.owner.username = json.owner.username;
        }
        
        var htag = process.env.owner_tag;
        if (htag){
            json.owner.tag = htag;
        }else{
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
        var hvoice = process.env.commands_categories_Voice;
        if (hvoice){
            json.commands.categories.Voice = hvoice;
        }else{
            json.commands.categories.Voice = json.commands.categories.Voice;
        }
        //#endregion
        //#region Support
        var hsupport = process.env.commands_categories_Support;
        if (hsupport == true)
            json.commands.categories.Support = true;
        else
            if (hsupport == false)
                json.commands.categories.Support = false;
        //#endregion
        //#region Info
        var hinfo = process.env.commands_categories_Info;
        if (hinfo == true)
            json.commands.categories.Info = true;
        else
            if (hinfo == false)
                json.commands.categories.Info = false;
        //#endregion
        //#region Random
        var hrandom = process.env.commands_categories_Random;
        if (hrandom == true)
            json.commands.categories.Random = true;
        else
            if (hrandom == false)
                json.commands.categories.Random = false;
        //#endregion
        //#region Moderation
        var hmoderation = process.env.commands_categories_Moderation;
        if (hmoderation == true)
            json.commands.categories.Moderation = true;
        else
            if (hmoderation == false)
                json.commands.categories.Moderation = false;
        //#endregion
        //#region Fun
        var hfun = process.env.commands_categories_Fun;
        if (hfun == true)
            json.commands.categories.Fun = true;
        else
            if (hfun == false)
                json.commands.categories.Fun = false;
        //#endregion
        //#region Osu
        var hosu = process.env.commands_categories_Osu;
        if (hosu == true)
            json.commands.categories.Osu = true;
        else
            if (hosu == false)
                json.commands.categories.Osu = false;
        //#endregion
        //#region Misc
        var hmisc = process.env.commands_categories_Misc;
        if (hmisc == true)
            json.commands.categories.Misc = true;
        else
            if (hmisc == false)
                json.commands.categories.Misc = false;
        //#endregion
        //#region Wiki
        var hwiki = process.env.commands_categories_Wiki;
        if (hwiki == true)
            json.commands.categories.Wiki = true;
        else
            if (hwiki == false)
                json.commands.categories.Wiki = false;
        //#endregion
        //#region Bot Owner
        var hbotOwner = process.env.commands_categories_BotOwner;
        if (hbotOwner == true)
            json.commands.categories.BotOwner = true;
        else
            if (hbotOwner == false)
                json.commands.categories.BotOwner = false;
        //#endregion
        return json.commands;
    }
}
//#endregion

exports.Data = Data;
