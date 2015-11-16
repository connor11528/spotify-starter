
app.factory('Songkick', [
	"$http",
	"SONGKICK_KEY",
	function($http, SONGKICK_KEY){
		var params = {
			apikey: SONGKICK_KEY
		};

		return {
			searchByName: function(artistName){
				var _params = angular.extend(params, { query: artistName });

				return $http({
					method: 'GET',
					url: 'http://api.songkick.com/api/3.0/search/artists.json',
					params: _params
				}).then(function(res){
					// give them the first artist of search
					return res.data.resultsPage.results.artist[0];
				});
			},
			artistUpcomingEvents: function(songkickId){
				return $http({
					method: 'GET',
					url: 'http://api.songkick.com/api/3.0/artists/' + songkickId + '/calendar.json',
					params: params
				}).then(function(res){
					return res.data.resultsPage.results.event;
				});
			}
		};
	}]);