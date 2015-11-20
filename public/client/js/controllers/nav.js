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
				console.log(token);
				Spotify.setAuthToken(token);
				Spotify.getCurrentUser().then(function(userData){					

					// create user
					$http.post(API_URL + 'users', {
						email: userData.email,
						name: userData.display_name
					}).then(function(res){
						if(res.data.success){
							// log user in
							$cookies.put('spotify-token', token);
							window.localStorage.setItem('spotify-token', token);
							auth.userLoggedIn(userData);
						}
					});
				});
			});
		};

		$scope.logout = function(){
			auth.logout();
		};
	}]);