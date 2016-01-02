var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, default: 'Awesome show description!' },
	img_thumb: { type: String, default: 'http://placehold.jp/150x150.png' },
	datetime: { type: Date, default: Date.now },
	ticket_link: { type: String },
	artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }]
});

// register the model
mongoose.model('Show', showSchema);