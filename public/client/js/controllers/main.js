
app.controller('MainCtrl', [
	"$scope", 
	"$rootScope", 
	"$q",
	"Spotify", 
	"artists",
	function($scope, $rootScope, $q, Spotify, artists){
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

		// search artists
		$scope.search = function(searchTerm){
			Spotify.search(searchTerm, 'artist', {})
				.then(function(res){
					$scope.searchResults = res.artists.items;
				});
		};

		// get popular artists
		var popularIds = [
			'04gDigrS5kc9YWfZHwBETP', // Maroon 5
			'4pb4rqWSoGUgxm63xmJ8xc', // Madeon
			'46CitWgnWrvF9t70C2p1Me', // Daughter
			'21mKp7DqtSNHhCAU2ugvUw', // Odesza
			'1rCIEwPp5OnXW0ornlSsRl' // Metric
		];
		$scope.popularArtists = [];
		popularIds.forEach(function(id){

			Spotify.getArtist(id).then(function(res){
				$scope.popularArtists.push(res);
			});
		});
		
	}]);