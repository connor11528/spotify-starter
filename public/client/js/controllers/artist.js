
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
				var artistData = res.resultsPage.results.artist[0];
				$scope.songkickInfo = artistData;

				Songkick.artistUpcomingEvents(artistData.id).then(function(eventsRes){
					var upcomingEvents = eventsRes.resultsPage.results.event;
					$scope.upcomingEvents = upcomingEvents;
					$scope.loading = false;

					// because we send request using jQuery in factory
					$scope.$apply();
				});
			});
		});

		// top tracks, albums, related artists

	}]);