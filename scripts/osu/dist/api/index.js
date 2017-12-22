"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("request");
const errors_1 = require("./errors");
class APIWrapper {
    constructor(apiKey) {
        this._baseUrl = "https://osu.ppy.sh/api";
        this.apiKey = apiKey;
    }
    set apiKey(apiKey) {
        this._apiKey = apiKey;
    }
    apiCall(url, options) {
        options["k"] = this._apiKey;
        const payload = {
            "baseUrl": this._baseUrl,
            "qs": options,
            "url": url
        };
        return new Promise((resolve) => {
            request_1.get(payload, (error, response, body) => {
                if (error)
                    throw new errors_1.APIError(`Failed to call API ${url}. Error: ${error.toString()}`);
                const result = JSON.parse(body);
                resolve(result);
            });
        });
    }
    getBeatmaps(options) {
        return this.apiCall("/get_beatmaps", options);
    }
    getMatch(options) {
        return this.apiCall("/get_match", options);
    }
    getReplay(options) {
        return this.apiCall("/get_replay", options);
    }
    getScores(options) {
        return this.apiCall("/get_scores", options);
    }
    getUser(options) {
        return this.apiCall("/get_user", options);
    }
    getUserBest(options) {
        return this.apiCall("/get_user_best", options);
    }
    getUserRecent(options) {
        return this.apiCall("/get_user_recent", options);
    }
}
exports.APIWrapper = APIWrapper;
function api(apiKey) {
    return new APIWrapper(apiKey);
}
exports.api = api;
//# sourceMappingURL=index.js.map