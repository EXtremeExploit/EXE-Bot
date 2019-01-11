var arrays = require('../json/commands');

const _main = require('./scripts');
const main = new _main.Main();
const data = main.getData();
var wikis = data.wikis();

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
