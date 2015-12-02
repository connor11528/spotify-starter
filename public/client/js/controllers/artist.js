
app.controller('ArtistCtrl', [
	"$scope", 
	"$stateParams", 
	"Spotify",
	"Songkick",
	"artists",
	"$rootScope",
	function($scope, $stateParams, Spotify, Songkick, artists, $rootScope){
		var artist_spotify_id = $stateParams.id;
		$scope.artist = {};
		$scope.relatedArtists = [];
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

		// related artists
		Spotify.getRelatedArtists(artist_spotify_id).then(function(res){
			$scope.relatedArtists = res.artists;
		});

		//------ duplicated from main.js ------
		// follow artist
		$scope.followArtist = function(artistId){
			artists.follow(artistId).then(function(){
				Spotify.getArtist(artistId).then(function(artistToFollow){
					$rootScope.artists.unshift(artistToFollow);
				});				
			});
		};

		// follow artist
		$scope.unfollowArtist = function(artistId){
			artists.unfollow(artistId).then(function(){
				var artistToUnfollow = _.find($rootScope.artists, function(artist, i){
					return artist.id == artistId;
				});
				_.remove($rootScope.artists, artistToUnfollow);
			});
		};

		$scope.userFollows = artists.userFollows;
		//------ /duplicated from main.js ------

	}]);