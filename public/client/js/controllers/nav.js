app.controller('NavCtrl', [
	'$scope', 
	'$rootScope', 
	'$cookies',
	'$http',
	'Spotify', 
	'API_URL',
	'auth',
	function($scope, $rootScope, $cookies, $http, Spotify, API_URL, auth){

		$scope.requestSpotifyLogin = function(){

			Spotify.login().then(function(token){
				
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
							auth.userLoggedIn(userData);
						}
					});
				});
			});
		};

		$scope.logout = function(){
			$rootScope.user = false;
			$cookies.remove('spotify-token');
		};
	}]);