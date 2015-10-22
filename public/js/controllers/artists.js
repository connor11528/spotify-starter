
app.controller('ArtistsCtrl', function($scope, $rootScope, Spotify, $http){

	$scope.getFollowing = function(){

    	var req = {
			method: 'GET',
			url: 'https://api.spotify.com/v1/me/following',
			headers: {
				'Authorization': 'Bearer ' + $rootScope.token,
				'Content-Type': 'application/json'
			},
			data: { type: 'artist' }
		};

		// $http(req)
		Spotify.userFollowingContains().then(function(res){
			console.log(res);
		})
	};
});