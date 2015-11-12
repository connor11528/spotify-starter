
var app = angular.module('spotify-admin', [
	'ui.bootstrap',
  'spotify'
]);

// typeahead for artists: https://github.com/angular-ui/bootstrap/tree/master/src/typeahead

app.controller('TypeaheadCtrl', function($scope, $http, Spotify) {

  // Any function returning a promise object can be used to load values asynchronously
  $scope.getArtists = function(val) {
    return Spotify.search(val, 'artist')
      .then(function(res){
        return res.artists.items.map(function(artist){
          return artist.name + ' (' + artist.id + ')';
        });
      });
  };

});