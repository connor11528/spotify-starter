var express = require('express'),
	path = require('path'),
	request = require('request'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	User = require('./models/user'),
	Show = require('./models/show'),
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

	apiRouter.post('/shows/add', function(req, res){
		var title = req.body.title,
			date = req.body.date;
		// add show
		var newShow = new Show({
			title: title,
			date: date
		});

		newShow.save(function(err){
			if(err) throw err;

			res.redirect('/admin');
			// res.sendFile(rootPath + 'public/admin.html', {
			// 	success: true,
			// 	message: 'Successfully added show!',
			// 	show: newShow
			// });
		});
	});

	apiRouter.get('/shows', function(req, res){
		Show.find({}, function(err, shows){
			res.json(shows);
		});
	});

	router.get('/admin', function(req, res){
		res.sendFile(rootPath + 'public/admin.html');
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

