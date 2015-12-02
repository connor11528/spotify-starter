
module.exports = {
	add: function(req, res){

	},
	getAll: function(req, res){

	},
	getOne: function(req, res, next){

	},
	updateOne: function(req, res, next){

	},
	deleteOne: function(req, res, next){

	},
	followArtist: function(req, res, next){
		console.log('in followArtist!');
		
		var _userId = req.body.userId,
			_artistId = req.body.artistId,
			_token = req.body.token;

		// static method, takes: userId, artistId, token, cb
		User.follow(_userId, _artistId, _token, function(err, updatedUser){
			 if (err) throw err;
			 console.log('it worked!!');
			res.json({
				success: true,
				message: 'Followed!',
				user: updatedUser
			});
		});
	}
};