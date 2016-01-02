var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// all users
router.get('/', function(req, res){
	User.find({}, function(err, users){
		res.json(users);
	});
});

// add a user
router.post('/', function(req, res){
	var query = User.findOne({
		email: req.body.email
	});

	query.exec(function(err, user){
		if(err) throw err;

		if(user){
			res.json({
				success: true, 
				message: 'User already exists, good to go!',
				user: user
			});
		} else {
			// create a new user
			var newUser = new User({
				email: req.body.email,
				name: req.body.name,
				admin: false
			});

			newUser.save(function(err){
				if(err) throw err;

				res.json({
					success: true,
					message: 'Successfully created user!',
					user: newUser
				});
			});
		}
	});
});

module.exports = router;
