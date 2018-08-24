const https = require('https');
const http = require('http');

exports.request = (host, options, data) => {
	return new Promise((resolve, reject) => {
		if (host === undefined) reject(new Error('\'host\' is undefined'));
		else {
			let protocol;
			if (host.startsWith('https://'))
				protocol = https;
			else if (host.startsWith('http://'))
				protocol = http;
			else {
				reject(new Error('Invalid protocol: https or http'));
				return;
			}
			host = host.replace('https://', '').replace('http://', '');
			host = host.split('/');
			if (options === undefined)
				options = {};
			options.hostname = host.shift();
			options.path = '/' + host.join('/');
			let req = protocol.request(options, res => {
				res.setEncoding('utf8');
				let html = '';
				res.on('data', data => {
					html += data.toString();
				});
				res.on('end', () => {
					if (('' + res.statusCode).startsWith('2'))
						resolve({ statusCode: res.statusCode, headers: res.headers, text: html });
					else
						reject(new Error('' + res.statusCode + ' ' + res.statusMessage));
				});
			}).on('error', reject);
			if (options.method == 'POST') {
				if (data === undefined) reject(new Error('\'data\' is undefined'));
				else req.write(data);
			}
			req.end();
		}
	});
};

exports.random = function (min, max) {
	if (max === undefined)
		return Math.floor(Math.random() * (min + 1));
	else
		return Math.floor(Math.random() * (max - min + 1)) + min;
};
