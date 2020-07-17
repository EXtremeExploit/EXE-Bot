import mongoose from 'mongoose';
export function convertMS(ms) {
    if (isNaN(ms) || ms < 0) {
        return null;
    }
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(Math.floor(Math.floor(Math.floor(ms / 1000) / 60) / 60) / 24);
    h = h % 24;
    ms = Math.floor((ms % 1000) * 1000) / 1000;
    return { days: d, hours: h, minutes: m, seconds: s, ms: ms };
}
export function convertDate(date, createdTimestamp) {
    let ct = convertMS(new Date().valueOf() - createdTimestamp);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    if (createdTimestamp)
        return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC (${ct.days} days, ${ct.hours} hours, ${ct.minutes} minutes, ${ct.seconds} seconds ago)`;
    return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC`;
}
let SocialSchema = new mongoose.Schema({
    id: String,
    money: Number,
    workCount: Number,
    workName: String,
    rep: Number,
    badges: [Number],
    kills: Number,
    deaths: Number,
    alias: String,
    coinflips: {
        heads: Number,
        tails: Number,
        edges: Number,
    },
    sandwichs: Number,
    cookies: Number,
    owos: Number,
});
export class SocialClass extends mongoose.Document {
}
export let SocialModel = mongoose.model('social', SocialSchema);
export function random(max, min) {
    if (min === undefined)
        return Math.floor(Math.random() * (max + 1));
    else
        return Math.floor(Math.random() * (max - min)) + min;
}
;
export function reverseString(string) {
    let splitString = string.split(``);
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join(``);
    return joinArray;
}
export function fixDecimals(number) {
    return parseFloat(number).toFixed(2);
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
export var CoinflipResults;
(function (CoinflipResults) {
    CoinflipResults[CoinflipResults["Head"] = 0] = "Head";
    CoinflipResults[CoinflipResults["Tails"] = 1] = "Tails";
    CoinflipResults[CoinflipResults["Edge"] = 2] = "Edge";
})(CoinflipResults || (CoinflipResults = {}));
export var Badges;
(function (Badges) {
    Badges[Badges["Owner"] = 0] = "Owner";
    Badges[Badges["Helper"] = 1] = "Helper";
    Badges[Badges["VIP"] = 2] = "VIP";
    Badges[Badges["CoinflipEdge"] = 3] = "CoinflipEdge";
    Badges[Badges["Coinflipper1M"] = 4] = "Coinflipper1M";
    Badges[Badges["Coinflipper100K"] = 5] = "Coinflipper100K";
    Badges[Badges["Coinflipper10K"] = 6] = "Coinflipper10K";
    Badges[Badges["Coinflipper1K"] = 7] = "Coinflipper1K";
    Badges[Badges["Rich"] = 8] = "Rich";
})(Badges || (Badges = {}));
export function GetStringFromBadges(rawBadges) {
    let badges = '';
    rawBadges.forEach((v, i) => {
        switch (i) {
            case Badges.Owner:
                if (v == 1)
                    badges += ':tools: - Owner\n';
                break;
            case Badges.Helper:
                if (v == 1)
                    badges += ':regional_indicator_h: - Helper\n';
                break;
            case Badges.VIP:
                if (v == 1)
                    badges += ':beginner: - VIP\n';
                break;
            case Badges.CoinflipEdge:
                if (v == 1)
                    badges += ':orange_circle: - Coinflip Edge\n';
                break;
            case Badges.Coinflipper1M:
                if (v == 1)
                    badges += ':infinity: - Coinflipper 1M\n';
                break;
            case Badges.Coinflipper100K:
                if (v == 1)
                    badges += ':arrows_clockwise: - Coinflipper 100K\n';
                break;
            case Badges.Coinflipper10K:
                if (v == 1)
                    badges += ':repeat: - Coinflipper 10K\n';
                break;
            case Badges.Coinflipper1K:
                if (v == 1)
                    badges += ':arrows_counterclockwise: - Coinflipper 1K\n';
                break;
            case Badges.Rich:
                if (v == 1)
                    badges += ':gem: - Rich';
                break;
        }
    });
    return badges == '' ? 'No badges :c' : badges;
}
export function createProfile(userID) {
    let numberOfBadges = Object.keys(Badges).length / 2;
    let badges = [];
    for (let i = 0; i < numberOfBadges; i++) {
        badges[i] = 0;
    }
    let Social = new SocialModel({
        id: userID,
        money: 0,
        workCount: 0,
        workName: null,
        alias: null,
        rep: 0,
        badges: badges,
        kills: 0,
        deaths: 0,
        coinflips: {
            heads: 0,
            tails: 0,
            edges: 0
        },
        sandwichs: 0,
        cookies: 0,
        owos: 0
    });
    return Social;
}
export function SocialCheckUndefineds(social) {
    if (social.rep == undefined || social.rep == null)
        social.set('rep', 0);
    if (social.workName == null || social.workName == undefined)
        social.set('workName', '');
    if (social.cookies == undefined || social.cookies == null)
        social.set('cookies', 0);
    if (social.sandwichs == undefined || social.sandwichs == null)
        social.set('sandwichs', 0);
    if (social.kills == null || social.kills == undefined)
        social.set('kills', 0);
    if (social.deaths == null || social.deaths == undefined)
        social.set('deaths', 0);
    if (social.alias == null || social.alias == undefined)
        social.set('alias', '');
    if (social.owos == undefined || social.owos == null)
        social.set('owos', 0);
    //Coinflips
    if (social.coinflips.heads == undefined)
        social.set('coinflips', {
            heads: 0,
            tails: social.coinflips.tails,
            edges: social.coinflips.edges,
        });
    if (social.coinflips.tails == undefined)
        social.set('coinflips', {
            heads: social.coinflips.heads,
            tails: 0,
            edges: social.coinflips.edges,
        });
    if (social.coinflips.edges == undefined)
        social.set('coinflips', {
            heads: social.coinflips.heads,
            tails: social.coinflips.tails,
            edges: 0,
        });
    for (let i = 0; i < Object.keys(Badges).length / 2; i++) {
        if (social.badges[i] == undefined || social.badges[i] == null)
            social.badges.set(i, 0);
    }
    return social;
}
