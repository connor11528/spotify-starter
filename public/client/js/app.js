
var app = angular.module('spotify-starter', [
	'ui.router',
	'ngCookies',
	'formly',
	'formlyBootstrap',
	'spotify'
]);

app.run(function($rootScope, $cookies, Spotify){
	var user_token = $cookies.get('spotify-token');
	if(user_token) {
		Spotify.setAuthToken(user_token);
		Spotify.getCurrentUser().then(function (data) {
			$rootScope.user = data;
			console.log($rootScope.user);
		});
	}
});

app.constant('API_URL', 'api/');

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
		// .state('artists', {
		// 	url: "/artists",
		// 	templateUrl: "templates/artists.html",
		// 	controller: 'ArtistsCtrl',
		// 	resolve: {
		// 		function($rootScope){
		// 			if($rootScope.user)
		// 				return true;
		// 			else
		// 				return false;
		// 		}
		// 	}
		// })

	$urlRouterProvider.otherwise("/");
});