var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SandiwchSchema = new Schema({
	id: String,
	count: Number
});

var CookieSchema = new Schema({
	id: String,
	count: Number
})

exports.sandwich = mongoose.model('sandwich', SandiwchSchema);
exports.cookie = mongoose.model('cookie', CookieSchema);
