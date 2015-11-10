var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// email, pwd are required
// email must be unique
// don't send password with requests

var userSchema = new Schema({
	email: {type: String, required: true, unique: true },
	name: {type: String, required: true },
	admin: Boolean
});

module.exports = mongoose.model('User', userSchema);