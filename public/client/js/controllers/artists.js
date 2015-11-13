// get artist user follows from spotify
app.controller('ArtistsCtrl', function($scope, $rootScope, Spotify, $http){

	$scope.getFollowing = function(after){
		var _params = {
			type: 'artist',
			limit: 50, // maximum
		};;

		if(after){
			// The last artist ID retrieved from the previous request
			_params['after'] = after;
		}

    	var req = {
			method: 'GET',
			url: 'https://api.spotify.com/v1/me/following',
			headers: {
				'Authorization': 'Bearer ' + $rootScope.token,
				'Content-Type': 'application/json'
			},
			params: _params
		};
		console.log(req);
		$http(req).then(function(res){
			console.log(res.data.artists);
			$scope.artists = res.data.artists.items;
			$scope.nextLink = res.data.artists.next;
			$scope.artistTotal = res.data.artists.total;
		});
	};

});