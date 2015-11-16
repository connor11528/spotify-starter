
app.controller('ShowsCtrl', [
	"$scope", 
	"$http", 
	"Spotify", 
	"API_URL", 
	"SONGKICK_KEY",
	function($scope, $http, Spotify, API_URL, SONGKICK_KEY){
	$scope.shows = [];

	var SF_BAY_AREA_SONGKICK_ID = '26330'; // http://www.songkick.com/developer/location-search
	
	$http({
		method: 'GET',
		url: 'http://api.songkick.com/api/3.0/events.json',
		params: {
			location: 'sk:' + SF_BAY_AREA_SONGKICK_ID,
			apikey: SONGKICK_KEY
		}
	}).then(function(res){
		console.log(res.data.resultsPage.results.event);
		$scope.shows = res.data.resultsPage.results.event;
	});
	
}]);