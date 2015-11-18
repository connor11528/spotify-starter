
app.controller('ArtistCtrl', [
	"$scope", 
	"$stateParams", 
	"Spotify",
	"Songkick",
	function($scope, $stateParams, Spotify, Songkick){
		var artist_spotify_id = $stateParams.id;
		$scope.artist = {};
		$scope.loading = true;

		// get artist info from spotify
		Spotify.getArtist(artist_spotify_id).then(function(res){
			$scope.artist = res;

			Songkick.searchByName($scope.artist.name).then(function(res){
				$scope.songkickInfo = res;

				Songkick.artistUpcomingEvents(res.id).then(function(upcomingEvents){
					$scope.upcomingEvents = upcomingEvents;
					$scope.loading = false;
				});
			});
		});

		// top tracks, albums, related artists

	}]);