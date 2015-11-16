
app.controller('MainCtrl', [
	"$scope", 
	"$rootScope", 
	"Spotify", 
	"artists", 
	function($scope, $rootScope, Spotify, artists){
		$scope.currentPage = 0;
		$scope.totalPages = function(artists){
			return Math.ceil(artists.length/4);
		};
		$scope.artists = [];

		// grab the artists they follow
		artists.getUserFollowing().then(function(artistsUserFollows){
			$scope.artistTotal = artistsUserFollows.length;
			$scope.artists = artistsUserFollows;
		});
	}]);