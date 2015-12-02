app.controller('NavCtrl', [
	'$scope', 
	'$rootScope', 
	'$http',
	'$cookies',
	'Spotify', 
	'API_URL',
	'auth',
	function($scope, $rootScope, $http, $cookies, Spotify, API_URL, auth){

		$scope.requestSpotifyLogin = function(){

			Spotify.login().then(function(token){

				// set cookies and tokens
				Spotify.setAuthToken(token);
				$cookies.put('spotify-token', token);
				window.localStorage.setItem('spotify-token', token);

				// get user from spotify
				Spotify.getCurrentUser().then(function(userData){

					// log in to showjunkie
					auth.userLoggedIn(userData).then(function(res){
						console.log('boom! ', res);
					});

				});
			});
		};

		$scope.logout = function(){
			auth.logout();
		};
	}]);