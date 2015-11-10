
app.controller('ShowsCtrl', ["$scope", "$http", "Spotify", "API_URL", function($scope, $http, Spotify, API_URL){
	$scope.shows = [];

	$http.get(API_URL + 'shows').then(function(res){
		$scope.shows = res.data;
	});
	
}]);