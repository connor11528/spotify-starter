var User = require('../models/user');

module.exports = {
	// add: function(req, res){
	// 	console.log(req.body);

	// 	// does a user with this email exist?
	// 	User.findOne({ email: req.body.email }, function(err, user){
	// 		if(err) throw err;
	// 		console.log(user);

	// 		// user already exists
	// 		if(user){
	// 			console.log('user exists!');
	// 		} else {
	// 			console.log('user DOES NOT exist!');
	// 			// user does not exist
	// 			var newUser = new User({
	// 				email: req.body.email,
	// 				name: req.body.name,
	// 				admin: false
	// 			});
	// 		}
			
	// 	});
		
	// },
	getAll: function(req, res){

	},
	getOne: function(req, res, next){

	},
	updateOne: function(req, res, next){

	},
	deleteOne: function(req, res, next){

	},
	followArtist: function(req, res, next){

		var _userId = req.body.userId,
			_artistId = req.body.artistId,
			_token = req.body.token;

		// static method, takes: userId, artistId, token, cb
		User.follow(_userId, _artistId, _token, function(err, updatedUser){
			if (err) throw err;

			res.json({
				success: true,
				message: 'Followed!',
				user: updatedUser
			});
		});
	}
};