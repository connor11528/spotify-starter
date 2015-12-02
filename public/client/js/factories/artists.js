
app.factory('artists', [
	"$rootScope", 
	"$http",
	"$cookies",
	"$q",
	"API_URL",
	function($rootScope, $http, $cookies, $q, API_URL){

	return {
		follow: function(artistId){
			console.log($rootScope.user);
			var _payload = {
				userId: null, // need to save user in database
				artistId: artistId,
				token: $rootScope.user.SJ_TOKEN
			}
			return $http.post(API_URL + 'follow/artist', _payload).then(function(res){
				return res.data;
			});
		},
		getUserFollowing: function(){
			var allArtists = [];
			var _params = {
				type: 'artist',
				limit: 50, // maximum
			};
			var _authConfig = {
				'Authorization': 'Bearer ' + $cookies.get('spotify-token'),
				'Content-Type': 'application/json'
			};

	    	var req = {
				method: 'GET',
				url: 'https://api.spotify.com/v1/me/following',
				headers: _authConfig,
				params: _params
			};
			return $http(req).then(function(res){

				var artistTotal = res.data.artists.total;
				allArtists = allArtists.concat(res.data.artists.items);

				if(allArtists.length < artistTotal){
					// send the request again to load 50 more artists
					return $http({
						method: 'GET',
						url: res.data.artists.next,
						headers: _authConfig,
					}).then(function(nextRes){
						allArtists = allArtists.concat(nextRes.data.artists.items);
						return allArtists;
					});
				} else {
					// need to return a promise
					var dfd = $q.defer();
					dfd.resolve(allArtists);
					return dfd.promise;
				}
			});
		}
	};
}]);