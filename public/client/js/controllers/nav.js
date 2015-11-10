app.controller('NavCtrl', [
	'$scope', 
	'$rootScope', 
	'$cookies',
	'$http',
	'Spotify', 
	'API_URL',
	function($scope, $rootScope, $cookies, $http, Spotify, API_URL){

		$scope.requestSpotifyLogin = function(){

			Spotify.login().then(function(data){
				
				Spotify.setAuthToken(data);
				Spotify.getCurrentUser().then(function (data) {					

					// create user
					$http.post(API_URL + 'users', {
						email: data.email,
						name: data.display_name
					}).then(function(res){
						if(res.data.success){
							// log user in
							$cookies.put('spotify-token', data);
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