var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
	songkick_id: String,
	spotify_id: String,
	imageUrl: String,
	name: String
});

module.exports = mongoose.model('Artist', artistSchema);