
app.controller('MainCtrl', [
	"$scope", 
	"$rootScope", 
	"Spotify", 
	"artists", 
	function($scope, $rootScope, Spotify, artists){
		$scope.currentPage = 0;
		$scope.searchResults = [];

		$scope.totalPages = function(artists){
			return Math.ceil(artists.length/4);
		};

		$scope.addPage = function(){
			$scope.currentPage = $scope.currentPage + 1;
		};

		$scope.lessPage = function(){
			$scope.currentPage = $scope.currentPage - 1;
		};

		// grab the artists they follow
		artists.getUserFollowing().then(function(artistsUserFollows){
			$rootScope.artistTotal = artistsUserFollows.length;
			$rootScope.artists = artistsUserFollows;
		});

		$scope.search = function(searchTerm){
			Spotify.search(searchTerm, 'artist', {})
				.then(function(res){
					$scope.searchResults = res.artists.items;
				});
		};
	}]);