var express = require('express'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	request = require('request'),
	utils = require('./utils'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	User = require('./models/user'),
	router = express.Router();

module.exports = function(app){	

	// Spotify callback
	apiRouter.get('/spotify/callback', function(req, res){	
		res.sendFile(rootPath + 'public/callbackBox.html', {});
	});

	// Users
	// all users
	apiRouter.get('/users', authenticate, function(req, res){
		User.find({}, function(err, users){
			res.json(users);
		});
	});

	// add user
	apiRouter.post('/users', function(req, res){

		var query = User.findOne({
			email: req.body.email
		});

		query.exec(function(err, user){
			if(err) throw err;

			if(user){
				res.json({ success: true, message: 'User already exists, good to go!' });
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

	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);
	app.use('/', router);

	// middleware
	function authenticate(req, res, next){

	}
};

