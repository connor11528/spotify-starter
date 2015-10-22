
app.controller('MainCtrl', function($scope, $http, $window, $rootScope, Spotify){
	$rootScope.token = $window.localStorage.getItem('spotify-token') || null;

	$scope.requestSpotifyLogin = function(){
		Spotify.login().then(function(data){
			$rootScope.token = data;
			Spotify.authToken = data;
			console.log(data);
			console.log(Spotify.authToken);
			$http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;
		});
	};

	$scope.logout = function(){
		$rootScope.token = false;
		$rootScope.user = false;
		$window.localStorage.setItem('spotify-token', null);
	};
	
});