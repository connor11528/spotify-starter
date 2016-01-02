var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Spotify callback
router.get('/spotify/callback', function(req, res){	
	res.sendFile(rootPath + 'public/callbackBox.html', {});
});

// follow an artist
router.post('/follow/artist', function(req, res, next){

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
});

module.exports = router;