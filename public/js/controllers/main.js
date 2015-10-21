
app.controller('MainCtrl', function($scope, $http, API_URL){
	// $http.get(API_URL + 'users').then(function(users){
	// 	$scope.users = users.data;
	// }, function(err){
	// 	console.error('Error getting users');
	// });

	$scope.requestSpotifyLogin = function(){
		$http.get(API_URL + 'login/spotify').then(function(res){
			console.log(res.data);
		});
	};


});