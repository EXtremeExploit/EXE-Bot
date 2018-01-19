//#region JSON
const main = new (require('../')).Main();
const json = main.getJson();
//#endregion

//#region Settings
class settings {
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
    voiceEnabled() {
        return json.voiceEnabled
    }
}
//#endregion

module.exports = settings;
