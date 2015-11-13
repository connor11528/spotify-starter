
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
		artists.getUserFollowing().then(function(res){
			console.log(res);
			$scope.artistTotal = res.artistTotal;

			// async loop! (http://stackoverflow.com/questions/4288759/asynchronous-for-cycle-in-javascript)
			// (http://stackoverflow.com/questions/11488014/asynchronous-process-inside-a-javascript-for-loop)
			// make sure we have all artists
			while($scope.artists.length < res.artistTotal){
				$scope.artists.conccat(res.artists);

				// send request for more
				artists.getUserFollowing(res.artists[res.artists.length - 1].id)
					.then(function(res){

					});
			}
			$scope.artists = res.artists;
			
		});
	}]);