var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/spotify-starter',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'mongodb://heroku_j85w5828:1mkc5vol66gnjm5b2aa45eed94@ds055594.mongolab.com:55594/heroku_j85w5828',
		port: process.env.PORT || 80
	}
};

heroku config | grep MONGOLAB_URI