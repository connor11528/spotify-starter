
app.factory('artists', [
	"$rootScope", 
	"$http",
	"$cookies",
	function($rootScope, $http, $cookies){

	return {
		getUserFollowing: function(after){
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
					'Authorization': 'Bearer ' + $cookies.get('spotify-token'),
					'Content-Type': 'application/json'
				},
				params: _params
			};
			return $http(req).then(function(res){
				return {
					artists: res.data.artists.items,
					nextLink: res.data.artists.next,
					artistTotal: res.data.artists.total
				};
			});
		}
	};

}]);