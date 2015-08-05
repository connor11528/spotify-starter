var express = require('express'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	User = require('./models/user'),
	router = express.Router();

module.exports = function(app){	
	// Users
	// all users
	apiRouter.get('/users', function(req, res){
		User.find({}, function(err, users){
			res.json(users);
		});
	});

	// add users
	apiRouter.post('/users', function(req, res){
		// need to hash password etc
		var newUser = new User({
			name: req.body.name,
			password: req.body.password,
			admin: true
		});

		newUser.save(function(err){
			if(err) throw err;

			res.json({ success: true });
		});
	});

	// authenticate user
	apiRouter.post('/users/auth', function(req, res){
		User.findOne({
			name: req.body.name
		}, function(err, user){
			if(err) throw err;

			if(!user){
				res.json({ success: false, message: 'No user with that name' });
			} else if(user){
				// check password
				if(user.password !== req.body.password){
					res.json({ success: false, message: 'Wrong password' });
				} else {
					// create token
					var token = jwt.sign(user, app.get('superSecret'), { expiresInminutes: 1440 });

					// send token
					res.json({
						success: true,
						message: 'Successfully authenticated!',
						token: token
					});
				}
			}
		});
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){
			// decode token
			jwt.ferify(token, app.get('superSecret'), function(err, decoded){

			});
		} else {
			// there is no token
		}
	});


	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);
	app.use('/', router);
};