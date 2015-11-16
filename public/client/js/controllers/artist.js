
app.controller('ArtistCtrl', [
	"$scope", 
	"$stateParams", 
	"Spotify",
	function($scope, $stateParams, Spotify){
		var artist_spotify_id = $stateParams.id;
		$scope.artist = {};

		// get artist info from spotify
		Spotify.getArtist(artist_spotify_id).then(function(res){
			$scope.artist = res;
		});

		// top tracks, albums, related artists

	}]);