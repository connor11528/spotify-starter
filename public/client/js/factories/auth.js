

app.factory('auth', [
	"$rootScope", 
	"artists",
	"$cookies",
	"$http",
	"API_URL",
	function($rootScope, artists, $cookies, $http, API_URL){
		return {
			// must return promise
			userLoggedIn: function(userData){

				// create user in database (email, name, admin)
				return $http.post(API_URL + 'users', {
					email: userData.email,
					name: userData.display_name
				}).then(function(res){
					if(res.data.success){
						var showjunkie_user_data = res.data.user;

						// log user in, attach token and id
						angular.extend(
							userData, 
							{ SJ_TOKEN: $cookies.get('spotify-token') }, 
							{ SJ_USER_ID: showjunkie_user_data._id }
						);

						$rootScope.user = userData;
						console.log($rootScope.user);
					}
				});

				// grab the artists they follow
				return artists.getUserFollowing().then(function(artistsUserFollows){
					$rootScope.artistTotal = artistsUserFollows.length;
					$rootScope.artists = artistsUserFollows;
				});
			},
			logout: function(){
				$rootScope.user = false;
				$cookies.remove('spotify-token');
				$rootScope.artists = [];
				$rootScope.artistTotal = 0;
			}
		};
	}]);