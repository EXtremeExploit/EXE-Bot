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
            this.commands().categories.Voice = hvoice;
        }else{
            this.commands().categories.Voice = json.commands.categories.Voice;
        }
        //#endregion
        //#region Support
        var hsupport = process.env.commands_categories_Support;
        if (hsupport == true)
            this.commands().categories.Support = true;
        else
            if (hsupport == false)
                this.commands().categories.Support = false;
        //#endregion
        //#region Info
        var hinfo = process.env.commands_categories_Info;
        if (hinfo == true)
            this.commands().categories.Info = true;
        else
            if (hinfo == false)
                this.commands().categories.Info = false;
        //#endregion
        //#region Random
        var hrandom = process.env.commands_categories_Random;
        if (hrandom == true)
            this.commands().categories.Random = true;
        else
            if (hrandom == false)
                this.commands().categories.Random = false;
        //#endregion
        //#region Moderation
        var hmoderation = process.env.commands_categories_Moderation;
        if (hmoderation == true)
            this.commands().categories.Moderation = true;
        else
            if (hmoderation == false)
                this.commands().categories.Moderation = false;
        //#endregion
        //#region Fun
        var hfun = process.env.commands_categories_Fun;
        if (hfun == true)
            this.commands().categories.Fun = true;
        else
            if (hfun == false)
                this.commands().categories.Fun = false;
        //#endregion
        //#region Osu
        var hosu = process.env.commands_categories_Osu;
        if (hosu == true)
            this.commands().categories.Osu = true;
        else
            if (hosu == false)
                this.commands().categories.Osu = false;
        //#endregion
        //#region Misc
        var hmisc = process.env.commands_categories_Misc;
        if (hmisc == true)
            this.commands().categories.Misc = true;
        else
            if (hmisc == false)
                this.commands().categories.Misc = false;
        //#endregion
        //#region Wiki
        var hwiki = process.env.commands_categories_Wiki;
        if (hwiki == true)
            this.commands().categories.Wiki = true;
        else
            if (hwiki == false)
                this.commands().categories.Wiki = false;
        //#endregion
        //#region Bot Owner
        var hbotOwner = process.env.commands_categories_BotOwner;
        if (hbotOwner == true)
            this.commands().categories.BotOwner = true;
        else
            if (hbotOwner == false)
                this.commands().categories.BotOwner = false;
        //#endregion
        return json.commands;
    }
}
//#endregion

exports.Data = Data;
