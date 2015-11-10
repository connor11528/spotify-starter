
var app = angular.module('spotify-starter', [
	'ui.router',
	'ngCookies',
	'formly',
	'formlyBootstrap',
	'spotify'
]);

app.run(function($rootScope, $cookies, Spotify){

	if($cookies.get('spotify-token')) { 
		Spotify.setAuthToken($cookies.get('spotify-token'));
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
	
	// this is my personal auth token..
	// SpotifyProvider.setAuthToken('BQCUnp9WisXiC0OwtF_RSERKsh3zHonuTRPyym-88intIFKPJZfgXj4YnbQiqakPzFiflJD7KErH-cg1FvO0Oigl1vFVg-PEp3hwV-mGZEJiApHaplTah8Yc5Jxg04dwMz7g-6En8Vxk7y_HV_pKTQ2G6S1dX6491SDsry0b_gb_pVSlz9rYP3M');

	// Routes
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
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