var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Show = mongoose.model('Show');

// :artist preloader
router.param('artist', function(req, res, next, spotifyId) {
	// when we define a route URL with :artist in it, this function will 
	// be run first. Assuming the :artist parameter contains an ID, our 
	// function will retrieve the artist object from the database and attach 
	// it to the req object after which the route handler function will be called.
	var query = Artist.find({ spotify_id: spotifyId });

	query.exec(function (err, artist){
		if (err) { return next(err); }
		if (!artist) { return next(new Error('can\'t find artist')); }

		req.artist = artist;
		return next();
	});
});

module.exports = router;