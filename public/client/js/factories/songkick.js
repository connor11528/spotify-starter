
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

				return $http.jsonp('http://api.songkick.com/api/3.0/search/artists.json?query=' + artistName + 'apikey=' + SONGKICK_KEY + 'callback=JSON_CALLBACK').then(function(res){
					console.log(res);
					// give them the first artist of search
					return res.data.resultsPage.results.artist[0];
				});
			},
			artistUpcomingEvents: function(songkickId){
				return $http({
					method: 'JSONP',
					url: 'http://api.songkick.com/api/3.0/artists/' + songkickId + '/calendar.json',
					params: params
				}).then(function(res){
					return res.data.resultsPage.results.event;
				});
			}
		};
	}]);