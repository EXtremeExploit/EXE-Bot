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

export function convertDate(date: Date, createdTimestamp?: number) {
	let ct = convertMS(new Date().valueOf() - createdTimestamp);

	let year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();
	let hour = date.getUTCHours();
	let minutes = date.getUTCMinutes();
	let seconds = date.getUTCSeconds();
	if (createdTimestamp)
		return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC (${ct.days} days, ${ct.hours} hours, ${ct.minutes} minutes, ${ct.seconds} seconds ago)`
	return `${year}/${month}/${day} @ ${hour}:${minutes}:${seconds} UTC`
}

let SandwichSchema = new mongoose.Schema({
	id: String,
	count: Number
});

let CookieSchema = new mongoose.Schema({
	id: String,
	count: Number
})

let OwoSchema = new mongoose.Schema({
	id: String,
	count: Number
})

let CoinflipSchema = new mongoose.Schema({
	id: String,
	heads: Number,
	tails: Number,
	edge: Number
})

let SandwichModel = mongoose.model(`sandwich`, SandwichSchema);
let CookieModel = mongoose.model(`cookie`, CookieSchema);
let OwOModel = mongoose.model(`owo`, OwoSchema);
let CoinflipModel = mongoose.model('coinflip', CoinflipSchema);
export { SandwichModel, CookieModel, OwOModel, CoinflipModel };

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

export enum CoinflipResults {
	Head,
	Tails,
	Edge
}