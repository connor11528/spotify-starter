var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
	songkick_id: String,
	spotify_id: String,
	imageUrl: String,
	name: String,
	shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }]
});

// register the model
mongoose.model('Artist', artistSchema);