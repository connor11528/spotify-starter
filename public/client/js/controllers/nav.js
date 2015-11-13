app.controller('NavCtrl', [
	'$scope', 
	'$rootScope', 
	'$cookies',
	'$http',
	'Spotify', 
	'API_URL',
	function($scope, $rootScope, $cookies, $http, Spotify, API_URL){

		$scope.requestSpotifyLogin = function(){

			Spotify.login().then(function(token){
				
				Spotify.setAuthToken(token);
				Spotify.getCurrentUser().then(function (data) {					

					// create user
					$http.post(API_URL + 'users', {
						email: data.email,
						name: data.display_name
					}).then(function(res){
						if(res.data.success){
							console.log(token);
							// log user in
							$cookies.put('spotify-token', token);
							$rootScope.user = data;
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