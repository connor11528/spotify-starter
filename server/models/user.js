var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// email, pwd are required
// email must be unique
// don't send password with requests

var userSchema = new Schema({
	email: {type: String, required: true, unique: true },
	name: {type: String, required: true },
	admin: Boolean,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	following: [String] // array of spotify artist ids
});

// Sets the created_at parameter equal to the current time
userSchema.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

// http://stackoverflow.com/questions/29504278/using-pull-in-mongoose-model
userSchema.static('follow', function follow(userId, artistId, token, cb) {
  var User = this;

  // make sure token is valid (or do this with route middleware)
  // ...

  return User.findOneAndUpdate({_id: userId }, {$push: {following: artistId}}, {new: true}).exec(cb);
});

// userSchema.static('unfollow', function unfollow(token, id, cb) {
//   var User = this;

//   // Returns a promise in Mongoose 4.X
//   // or call cb if provided
//   return User.findOneAndUpdate({token: token}, {$pull: {follows: {user: id}}}, {new: true}).exec(cb);
// });

module.exports = mongoose.model('User', userSchema);