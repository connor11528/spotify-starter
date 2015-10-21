
var app = angular.module('jwtintro', [
	'ui.router',
	'formly',
	'formlyBootstrap',
	'spotify',
	'callbackBox'
], function($httpProvider){
	// will add token to header of requests if token is present
	$httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, auth){
	// if the user's data is in local storage
	// show them as signed in
	var user = auth.getUser();

	if(user){
		$rootScope.user = JSON.parse(user);
	}
});

app.constant('API_URL', 'api/');

app.config(function($stateProvider, $urlRouterProvider, SpotifyProvider){
	// Spotify config
	SpotifyProvider.setClientId('68e85fc65d524c1fb18f5c0d0a251fc2');
	SpotifyProvider.setRedirectUri('http://localhost:3000/api/spotify/callback');
	SpotifyProvider.setScope('user-read-private user-read-email');
	
	// SpotifyProvider.setAuthToken('<AUTH_TOKEN>');

	// Routes
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl'
		})
		.state('auth', {
			abstract: true,
			templateUrl: 'templates/auth/main.html'
		})
		.state('auth.login', {
			url: "/login",
			templateUrl: "templates/auth/login.html",
			controller: 'LoginCtrl'
		})
		.state('auth.register', {
			url: "/register",
			templateUrl: "templates/auth/register.html",
			controller: 'RegisterCtrl'
		});

	$urlRouterProvider.otherwise("/");
});