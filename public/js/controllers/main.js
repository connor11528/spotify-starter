
app.controller('MainCtrl', function($scope, $http, $window, $rootScope, Spotify){
	$rootScope.token = $window.localStorage.getItem('spotify-token') || false;

	$scope.requestSpotifyLogin = function(){
		Spotify.login().then(function(data){
			console.log(data);
		});
	};

	$scope.$watch(function(){
		return $window.localStorage.getItem('spotify-token');
	}, function(newToken, oldToken){
		$rootScope.token = newToken;
		console.log(oldToken);
		console.log(newToken);
	});
	
});