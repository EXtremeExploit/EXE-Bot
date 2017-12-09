const json = require("../json/settings.json");
class settings {
    token(){
        var htoken = process.env.token
        if(!htoken)
            return json.token;
        else
            return htoken;
    }
    prefix(){
        var hprefix = process.env.prefix
        if(!hprefix)
            return json.prefix;
        else 
            return hprefix;
    }
    osuApiKey(){
        var hosuapikey = process.env.osuApiKey;
        if(!hosuapikey)
            return json.osuApiKey;
        else
            return hosuapikey;
    }
    owner(){
        return json.owner;
    }
    allEvents(){
        var hallevents = process.env.allEvents;
        if(!hallevents)
            return json.allEvents;
        else
            return hallevents;
    }
    debug(){
        var hdebug = process.env.debug;
        if(!hdebug)
            return json.debug;
        else
            return hdebug;
    }
}

module.exports = settings;
