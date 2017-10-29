const json = require("../json/settings.json");
class settings {
    token(){
        return json.token;
    }
    prefix(){
        return json.prefix;
    }
    osuApiKey(){
        return json.osuApiKey;
    }
    ownerID(){
        return json.ownerID;
    }
    allEvents(){
        return json.allEvents;
    }
    debug(){
        return json.debug;
    }
}

module.exports = settings;
