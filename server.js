
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    expressJwt = require('express-jwt'),
    morgan = require('morgan'),
	cors = require('cors'),
	app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	envConfig = require('./server/env')[env];

// DATABASE
// register models
require('./server/models/artist');
require('./server/models/show');
require('./server/models/user');

// connect
mongoose.connect(envConfig.db);

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

// ROUTES
var indexRoutes = require('./server/routes/index');
var apiRouter = require('./server/routes/api');
var artistsRoutes = require('./server/routes/artists');
var showsRoutes = require('./server/routes/shows');
var usersRoutes = require('./server/routes/users');

app.use('/', indexRoutes);
app.use('/api', apiRouter);
app.use('/api/artists', artistsRoutes);
app.use('/api/shows', showsRoutes);
app.use('/api/users', usersRoutes);

// Start server
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port)
});