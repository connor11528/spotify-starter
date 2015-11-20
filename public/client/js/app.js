
var app = angular.module('spotify-starter', [
	'ui.router',
	'ngCookies',
	'formly',
	'formlyBootstrap',
	'spotify'
]);

app.constant('SONGKICK_KEY', '1RVDAy31QZN5QMUh');
app.constant('API_URL', 'api/');

app.run([
	'$rootScope', 
	'$cookies', 
	'Spotify', 
	'auth',
	function($rootScope, $cookies, Spotify, auth){
	$rootScope.artists = [];
	$rootScope.artistTotal = 0;
	
	var user_token = $cookies.get('spotify-token');
	if(user_token) {
		Spotify.setAuthToken(user_token);
		Spotify.getCurrentUser().then(function(userData){
			auth.userLoggedIn(userData);
		});
	}
}]);

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	'SpotifyProvider',
	function($stateProvider, $urlRouterProvider, SpotifyProvider){
	// Spotify config
	SpotifyProvider.setClientId('68e85fc65d524c1fb18f5c0d0a251fc2');

	// conditionally set rederict uri
	var localPort = window.location.href.indexOf('3000') > -1 ? '3000' : '5000';
	var redirectURL = window.location.href.indexOf('localhost') > -1 ? 'http://localhost:' + localPort + '/api/spotify/callback' : 'http://showjunkie.herokuapp.com/api/spotify/callback';
	SpotifyProvider.setRedirectUri(redirectURL);
	// Spotify permissions
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
}]);