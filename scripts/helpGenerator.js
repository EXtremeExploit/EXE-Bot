var arrays = require('../json/commands');

const _main = require('./scripts');
const main = new _main.Main();
const data = main.getData();
var wikis = data.wikis();

//#region Support
var supportArray = arrays.support;
var support = '';
supportArray.forEach((e) => {
	support += '\n' + e;
});
exports.support = replacedWikis(support);
//#endregion

//#region Fun
var funArray = arrays.fun;
var fun = '';
funArray.forEach((e) => {
	fun += '\n' + e;
});
exports.fun = replacedWikis(fun);
//#endregion

//#region Info
var infoArray = arrays.info;
var info = '';
infoArray.forEach((e) => {
	info += '\n' + e;
});
exports.info = replacedWikis(info);
//#endregion

//#region Misc
var miscArray = arrays.misc;
var misc = '';
miscArray.forEach((e) => {
	misc += '\n' + e;
});
exports.misc = replacedWikis(misc);
//#endregion

//#region Moderation
var moderationArray = arrays.moderation;
var moderation = '';
moderationArray.forEach((e) => {
	moderation += '\n' + e;
});
exports.moderation = replacedWikis(moderation);
//#endregion

//#region NSFW
var nsfwArray = arrays.nsfw;
var nsfw = '';
nsfwArray.forEach((e) => {
	nsfw += '\n' + e;
});
exports.nsfw = replacedWikis(nsfw);
//#endregion

//#region Games
var gamesArrays = arrays.games;
var games = '';
gamesArrays.forEach((e) => {
	games += '\n' + e;
});
exports.games = replacedWikis(games);
//#endregion

//#region Random
var randomArray = arrays.random;
var random = '';
randomArray.forEach((e) => {
	random += '\n' + e;
});
exports.random = replacedWikis(random);
//#endregion

//#region Utility
var utilityArray = arrays.utility;
var utility = '';
utilityArray.forEach((e) => {
	utility += '\n' + e;
});
exports.utility = replacedWikis(utility);
//#endregion

//#region Wiki
var wikiArray = arrays.wiki;
var wiki = '';
wikiArray.forEach((e) => {
	wiki += '\n' + e;
});
exports.wiki = replacedWikis(wiki);
//#endregion

function replacedWikis(string) {
	return string.replace(/&WIKIS_HOME/g, wikis.home)
		.replace(/&WIKIS_COMMANDS/g, wikis.commands)
		.replace(/&WIKIS_REPLIES/g, wikis.replies)
		.replace(/&WIKIS_FAQ/g, wikis.faq)
		.replace(/&WIKIS_MODIFIERS/g, wikis.modifiers);
}
