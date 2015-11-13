
// ng-repeat pagination: http://jsfiddle.net/2ZzZB/56/
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});