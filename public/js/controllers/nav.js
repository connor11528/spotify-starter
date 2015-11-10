app.controller('NavCtrl', ['$scope', "$rootScope", '$cookies', 'Spotify', function($scope, $rootScope, $cookies, Spotify){

	$scope.requestSpotifyLogin = function(){

		Spotify.login().then(function(data){
			// $cookies.putObject()
			$cookies.put('spotify-token', data);
			Spotify.setAuthToken(data);
			Spotify.getCurrentUser().then(function (data) {
				$rootScope.user = data;
			});
		});
	};

	$scope.logout = function(){
		$rootScope.user = false;
	};
}]);