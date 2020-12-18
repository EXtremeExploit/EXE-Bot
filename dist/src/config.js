import json from '../json/config.json';
export default class {
    GetToken() {
        if (!process.env.token)
            throw Error(`Token should be given in an enviromental variable`);
        return process.env.token;
    }
    GetPrefix() {
        return json.prefix;
    }
    GetOwner() {
        return json.owner;
    }
    GetWikis() {
        return json.wikis;
    }
    GetDB() {
        if (!process.env.db_url)
            throw Error(`db_url should be given in an enviromental variable`);
        return process.env.db_url;
    }
    GetOsuKey() {
        if (!process.env.OsuKey)
            throw Error(`osu! Api Key should be given in an enviromental variable`);
        return process.env.OsuKey;
    }
    GetGoogle() {
        if (!process.env.GoogleCseID)
            throw Error(`GoogleCseID should be given in an enviromental variable`);
        if (!process.env.GoogleAppApiKey)
            throw Error(`GoogleAppApiKey should be given in an enviromental variable`);
        return {
            appApiKey: process.env.GoogleAppApiKey,
            cseID: process.env.GoogleCseID
        };
    }
}
export let ram = {
    rr: {
        channels: []
    },
    cfg: {
        logcmd: true
    }
};
