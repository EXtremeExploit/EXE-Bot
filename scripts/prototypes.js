const tools = require('./tools.js');

Object.defineProperty(String.prototype, 'fetchHTTP', {
	value: function fetchHTTP() {
		return tools.request(this);
	}
});

Object.defineProperty(Array.prototype, 'random', {
	value: function () {
		return this[tools.random(this.length - 1)];
	}
});
