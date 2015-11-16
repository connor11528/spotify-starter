

app.factory('auth', [
	"$rootScope", 
	"artists",
	"$cookies",
	function($rootScope, artists, $cookies){
		return {
			userLoggedIn: function(userData){
				// log user in
				$rootScope.user = userData;

				// grab the artists they follow
				return artists.getUserFollowing().then(function(artistsUserFollows){
					$rootScope.artistTotal = artistsUserFollows.length;
					$rootScope.artists = artistsUserFollows;
				});
			},
			logout: function(){
				$rootScope.user = false;
				$cookies.remove('spotify-token');
				$rootScope.artists = [];
				$rootScope.artistTotal = 0;
			}
		};
	}]);