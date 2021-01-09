import mongoose from 'mongoose';

export function convertMS(ms: number) {
	if (isNaN(ms) || ms < 0) {
		return null;
	}

	let d: number, h: number, m: number, s: number;
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

export function convertDate(date: Date, createdTimestamp?: number, ago?: boolean) {
	let ct = convertMS(new Date().valueOf() - createdTimestamp);

	let year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();
	let hour = date.getUTCHours();
	let minutes = date.getUTCMinutes();
	let seconds = date.getUTCSeconds();

	if (createdTimestamp)
		return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC (${ct.days} days, ${ct.hours} hours, ${ct.minutes} minutes, ${ct.seconds} seconds ago)`;

	if (ago) {
		let str = '';
		ct = convertMS(new Date().valueOf() - date.valueOf());
		if (ct.days != 0)
			str += `${ct.days} D, `;
		if (ct.hours != 0)
			str += `${ct.hours} Hr${ct.hours == 1 ? '' : 's'}, `;
		if (ct.minutes != 0)
			str += `${ct.minutes} Mins, `;
		if (ct.seconds != 0)
			str += `${ct.seconds} Secs`;
		if (str.endsWith(', ')) {
			str.substr(0, str.length - 2);
		}

		return str + ' Ago';
	}

	return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC`
}

export function random(max: number, min?: number) {
	if (min === undefined)
		return Math.floor(Math.random() * (max + 1));
	else
		return Math.floor(Math.random() * (max - min)) + min;
};

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
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function cleanMods(Mods: string[]) {
	let cleanModsArray = [];
	(Mods as string[]).forEach(element => {
		switch (element) {
			case 'FreeModAllowed':
			case 'ScoreIncreaseMods':
			case 'TouchDevice':
			case 'KeyMod':
			case 'None': element = ''; break;

			case 'NoFail': element = 'NF'; break;
			case 'Easy': element = 'EZ'; break;
			case 'Hidden': element = 'HD'; break;
			case 'HardRock': element = 'HR'; break;
			case 'SuddenDeath': element = 'SD'; break;
			case 'DoubleTime': element = 'DT'; break;
			case 'Relax': element = 'RX'; break;
			case 'HalfTime': element = 'HT'; break;
			case 'Nightcore': element = 'NC'; break;
			case 'Flashlight': element = 'FL'; break;
			case 'SpunOut': element = 'SO'; break;
			case 'Relax2': element = 'AP'; break;
			case 'Perfect': element = 'PF'; break;
			case 'Key1': element = '1K'; break;
			case 'Key2': element = '2K'; break;
			case 'Key3': element = '3K'; break;
			case 'Key4': element = '4K'; break;
			case 'Key5': element = '5K'; break;
			case 'Key6': element = '6K'; break;
			case 'Key7': element = '7K'; break;
			case 'Key8': element = '8K'; break;
			case 'Key9': element = '9K'; break;
			case 'FadeIn': element = 'FI'; break;
			case 'Random': element = 'RD'; break;
			case 'ScoreV2': element = 'ScoreV2'; break;
			case 'Mirror': element = 'MR'; break;
		}
		if (element != '')
			cleanModsArray.push(element);
	});
	return cleanModsArray.length != 0 ? ' +' + cleanModsArray : '';
}

export enum CoinflipResults {
	Head,
	Tails,
	Edge
}

//#region Social
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

export let SocialModel = mongoose.model('social', SocialSchema);

export class SocialClass extends mongoose.Document {
	id?: string;
	money?: number;
	workCount?: number;
	workName?: string;
	rep?: number;
	//TODO: add a proper type to badges that supports index and set 
	badges?: any;
	kills?: number;
	deaths?: number;
	alias?: string;
	coinflips?: {
		heads?: number;
		tails?: number;
		edges?: number;
	};
	sandwichs?: number;
	cookies?: number;
	owos?: number;
}

export enum Badges {
	Owner, // :tools:
	Helper, // :regional_indicator_h:
	VIP, // ::beginner::
	CoinflipEdge, // :orange_circle:
	Coinflipper1M, // :infinity:
	Coinflipper100K, // :arrows_clockwise:
	Coinflipper10K, // :repeat:
	Coinflipper1K, // :arrows_counterclockwise:
	Rich, // :gem:
}

export function GetStringFromBadges(rawBadges: number[]) {
	let badges = '';
	rawBadges.forEach((v, i) => {
		switch (i) {
			case Badges.Owner: if (v == 1) badges += ':tools: - Owner\n'; break;
			case Badges.Helper: if (v == 1) badges += ':regional_indicator_h: - Helper\n'; break;
			case Badges.VIP: if (v == 1) badges += ':beginner: - VIP\n'; break;
			case Badges.CoinflipEdge: if (v == 1) badges += ':orange_circle: - Coinflip Edge\n'; break;
			case Badges.Coinflipper1M: if (v == 1) badges += ':infinity: - Coinflipper 1M\n'; break;
			case Badges.Coinflipper100K: if (v == 1) badges += ':arrows_clockwise: - Coinflipper 100K\n'; break;
			case Badges.Coinflipper10K: if (v == 1) badges += ':repeat: - Coinflipper 10K\n'; break;
			case Badges.Coinflipper1K: if (v == 1) badges += ':arrows_counterclockwise: - Coinflipper 1K\n'; break;
			case Badges.Rich: if (v == 1) badges += ':gem: - Rich'; break;
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

export function SocialCheckUndefineds(social: SocialClass) {
	if (social.rep == undefined || social.rep == null) social.set('rep', 0);

	if (social.workName == null || social.workName == undefined) social.set('workName', '');

	if (social.cookies == undefined || social.cookies == null) social.set('cookies', 0);
	if (social.sandwichs == undefined || social.sandwichs == null) social.set('sandwichs', 0);

	if (social.kills == null || social.kills == undefined) social.set('kills', 0);
	if (social.deaths == null || social.deaths == undefined) social.set('deaths', 0);

	if (social.alias == null || social.alias == undefined) social.set('alias', '');

	if (social.owos == undefined || social.owos == null) social.set('owos', 0);

	//Coinflips
	if (social.coinflips.heads == undefined) social.set('coinflips', {
		heads: 0,
		tails: social.coinflips.tails,
		edges: social.coinflips.edges,
	});

	if (social.coinflips.tails == undefined) social.set('coinflips', {
		heads: social.coinflips.heads,
		tails: 0,
		edges: social.coinflips.edges,
	});
	if (social.coinflips.edges == undefined) social.set('coinflips', {
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
//#endregion

//#region Server Config
let ServerConfigSchema = new mongoose.Schema({
	id: String,
	repliesEnabled: Boolean,
	hasSentAReply: Boolean,
});

export let ServerConfigModel = mongoose.model('ServerConfig', ServerConfigSchema);

export class ServerConfigClass extends mongoose.Document {
	id?: string;
	repliesEnabled?: boolean;
	hasSentAReply?: boolean;
}

export function createServerConfig(serverID: string) {
	let config = new ServerConfigModel({
		id: serverID,
		repliesEnabled: true,
		hasSentAReply: false,
	});
	return config;
}

export function ServerConfigCheckUndefineds(config: ServerConfigClass) {
	if (config.repliesEnabled == undefined || config.repliesEnabled == null) config.set('repliesEnabled', true);
	if (config.hasSentAReply == undefined || config.hasSentAReply == null) config.set('hasSentAReply', false);
	return config;
}

//#endregion

//#region Cooldown
let CooldownSchema = new mongoose.Schema({
	id: String,
	command: String,
	time: Number,
});

export let CooldownModel = mongoose.model('cooldown', CooldownSchema);

export class CooldownsClass extends mongoose.Document {
	id?: string;
	command?: string;
	time?: number;
}

export function createCooldown(id: string, cmd: string) {
	let config = new CooldownModel({
		id: id,
		command: cmd,
		time: 0,
	});
	return config;
}

export function CooldownCheckUndefineds(cd: CooldownsClass) {
	if (cd.time == undefined || cd.time == null) cd.set('time', 0);
	return cd;
}

//#endregion