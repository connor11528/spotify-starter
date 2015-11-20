
app.factory('Songkick', [
	"$http",
	"SONGKICK_KEY",
	function($http, SONGKICK_KEY){
		var reqCreds = 'apikey=' + SONGKICK_KEY + '&jsoncallback=?';

		return {
			searchByName: function(artistName){
				var url = 'http://api.songkick.com/api/3.0/search/artists.json?query=' + artistName + '&' + reqCreds;

				return $.getJSON(url);

			},
			artistUpcomingEvents: function(songkickId){
				var url = 'http://api.songkick.com/api/3.0/artists/' + songkickId + '/calendar.json' + '?' + reqCreds;
				return $.getJSON(url);
			}
		};
	}]);