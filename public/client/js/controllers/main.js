
app.controller('MainCtrl', [
	"$scope", 
	"$rootScope", 
	"$q",
	"Spotify", 
	"artists",
	"Songkick",
	function($scope, $rootScope, $q, Spotify, artists, Songkick){
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


		// grab the artists they follow (from spotify)
		if(!$rootScope.showsForUser){

			$rootScope.showsForUser = [];
			artists.getUserFollowing()
				.then(function(artistsUserFollows){
					$rootScope.artistTotal = artistsUserFollows.length;
					$rootScope.artists = artistsUserFollows;
				}).then(function(){
					// find upcoming shows
					$rootScope.artists.forEach(function(artist){
						// have to do this in order to get artist's id from songkick (ew)
						Songkick.searchByName(artist.name)
							.then(function(res){
								var artistData;
								try {
									artistData = res.resultsPage.results.artist[0];
								} catch(e){

								}

								if(artistData){
									// get all shows for the artist
									Songkick.artistUpcomingEvents(artistData.id)
										.then(function(eventSearch){
											if (eventSearch.resultsPage.totalEntries > 0){
												var upcomingShows = eventSearch.resultsPage.results.event;
												// filter out shows not in our location
												upcomingShows.forEach(function(show){

													if(show.location.city === "San Francisco, CA, US" || show.location.city === "Oakland, CA, US"){
														$rootScope.showsForUser.push(show);
														$scope.$apply();
													}
												});
											}
											
										});
								}
								
							});
					});
				});
		}


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

		// follow artist
		$scope.followArtist = function(artistId){
			artists.follow(artistId).then(function(){
				Spotify.getArtist(artistId).then(function(artistToFollow){
					$rootScope.artists.unshift(artistToFollow);
				});				
			});
		};

		// unfollow artist
		$scope.unfollowArtist = function(artistId){
			artists.unfollow(artistId).then(function(){
				var artistToUnfollow = _.find($rootScope.artists, function(artist, i){
					return artist.id == artistId;
				});
				_.remove($rootScope.artists, artistToUnfollow);
			});
		};

		$scope.userFollows = artists.userFollows;

		
	}]);