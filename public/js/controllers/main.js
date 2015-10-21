
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

	$http.get('https://accounts.spotify.com/authorize?client_id=68e85fc65d524c1fb18f5c0d0a251fc2&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice')
		.then(function(res){
			console.log(res.data);
		});
});