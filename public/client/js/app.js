
var app = angular.module('spotify-starter', [
	'ui.router',
	'ngCookies',
	'formly',
	'formlyBootstrap',
	'spotify'
]);

app.constant('SONGKICK_KEY', '1RVDAy31QZN5QMUh');
app.constant('API_URL', 'api/');

app.run(function($rootScope, $cookies, Spotify, auth){
	$rootScope.artists = [];
	$rootScope.artistTotal = 0;
	
	var user_token = $cookies.get('spotify-token');
	if(user_token) {
		Spotify.setAuthToken(user_token);
		Spotify.getCurrentUser().then(function(userData){
			auth.userLoggedIn(userData);
		});
	}
});

app.config(function($stateProvider, $urlRouterProvider, SpotifyProvider){
	// Spotify config
	SpotifyProvider.setClientId('68e85fc65d524c1fb18f5c0d0a251fc2');
	SpotifyProvider.setRedirectUri('http://localhost:3000/api/spotify/callback');
	SpotifyProvider.setScope('user-read-email user-follow-read user-follow-modify user-library-read');

	// Routes
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "client/templates/main.html",
			controller: 'MainCtrl'
		})
		.state('artists', {
			url: "/artists",
			templateUrl: "client/templates/artists.html",
		})
		.state('artists.detail', {
			url: "/:id",
			templateUrl: "client/templates/artist.html",
			controller: 'ArtistCtrl'
		})

	$urlRouterProvider.otherwise("/");
});