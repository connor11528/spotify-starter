

app.factory('auth', [
	"$rootScope", 
	"artists",
	function($rootScope, artists){
		return {
			userLoggedIn: function(userData){
				// log user in
				$rootScope.user = userData;
				
				// grab the artists they follow
				return artists.getUserFollowing().then(function(res){
					// $rootScope.artists = res.artists;
					// $rootScope.artistTotal = res.artistTotal;
				});
			}
		};
	}]);