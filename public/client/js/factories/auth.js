

app.factory('auth', [
	"$rootScope", 
	"artists",
	"$cookies",
	function($rootScope, artists, $cookies){
		return {
			userLoggedIn: function(userData){
				// log user in, attach token
				var user_token = $cookies.get('spotify-token');
				angular.extend(userData, { SJ_TOKEN: user_token })
				$rootScope.user = userData;

				// create user in database..

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