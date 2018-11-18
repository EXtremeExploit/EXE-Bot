const _main = require('./scripts');
const main = new _main.Main();
const data = main.getData();
const token = data.token();
const osuApiKey = data.osuApiKey();
const discordBotsToken = data.discordBots().token;

class Functions {
	/**
	 * @param {string} text
	 */
	clean(text) {
		if (typeof (text) == 'string')
			return text
				.replace(token, '*TOKEN*')
				.replace(osuApiKey, '*OSUAPIKEY*')
				.replace(discordBotsToken, '*DISCORDBOTSTOKEN*');
		else
			return text;
	}
	/**
	 * @param {string} string 
	 */
	reverseString(string) {
		var splitString = string.split('');
		var reverseArray = splitString.reverse();
		var joinArray = reverseArray.join('');
		return joinArray;
	}
	/**
	 * Fixes decimals to 2 decimals
	 * @param {number} number
	 * @returns {string} 
	 */
	fixDecimals(number) {
		return parseFloat(number).toFixed(2);
	}
	/**
	 * Converts timestamp/ms to days, hours, minutes and seconds
	 * @param {number} ms 
	 */
	convertMS(ms) {
		if (isNaN(ms) || ms < 0) {
			return null;
		}

		var d, h, m, s;
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
}

module.exports = Functions;
