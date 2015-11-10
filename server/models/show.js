var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
	title: { type: String, required: true },
	date: { type: Date, default: Date.now },
	artists: [String] // spotify ids
});

module.exports = mongoose.model('Show', showSchema);