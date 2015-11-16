
app.controller('ArtistCtrl', [
	"$scope", 
	"$stateParams", 
	"Spotify",
	"Songkick",
	function($scope, $stateParams, Spotify, Songkick){
		var artist_spotify_id = $stateParams.id;
		$scope.artist = {};

		// get artist info from spotify
		Spotify.getArtist(artist_spotify_id).then(function(res){
			$scope.artist = res;

			Songkick.searchByName($scope.artist.name).then(function(res){
				$scope.songkickInfo = res;

				Songkick.artistUpcomingEvents(res.id).then(function(upcomingEvents){
					$scope.upcomingEvents = upcomingEvents;
				});
			});
		});

		// top tracks, albums, related artists

	}]);