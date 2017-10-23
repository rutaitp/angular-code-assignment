// Instantiate the app, the 'myApp' parameter must 
// match what is in ng-app
var myApp = angular.module('myApp', []);

// Create the controller, the 'StarWarsCtrl' parameter 
// must match an ng-controller directive
myApp.controller('StarWarsCtrl', function ($scope, $http) {
  
  // Define an array of Star Wars objects
  $scope.characters = [{
    "name": "Luke Skywalker",
    "url": "https://swapi.co/api/people/1/"
  }, {
    "name": "Darth Vader",
    "url": "https://swapi.co/api/people/4/"
  }, {
    "name": "Obi-wan Kenobi",
    "url": "https://swapi.co/api/people/unknown/"
  }, {
    "name": "R2-D2",
    "url": "https://swapi.co/api/people/2/"
  }];

  //execute this function after user selects Star Wars character
  $scope.execute = function () {
    // get inside selected URL and read the data (entire object)
    $http.get($scope.selectedCharacter)
      .then(function(response) {
        $scope.apiData = response.data;

        // create empty arrays for the data from each link that we'll be using later
        $scope.titles = [];
        $scope.releaseDates = [];
        $scope.directors = [];
        //also create an object to bind arrays together
        $scope.allData = {};

        // loop through the film link array from the selected URL
        angular.forEach($scope.apiData.films, function(link) {

          //get data from each link in the array
          $http.get(link)
            .then(function(response) {
              $scope.valueData = response.data;
              
              //push necessary keys into new arrays of data (titles, release dates, director names)
              $scope.titles.push($scope.valueData.title);
              $scope.releaseDates.push($scope.valueData.release_date);
              $scope.directors.push($scope.valueData.director);

              //bind two arrays together, so data appears together in HTML
              $scope.allData = $scope.titles.map(function(value, index) {
                return {
                  data: value,
                  value: $scope.releaseDates[index],
                  director: $scope.directors[index]
                }
              });
            });
        });
      });
  }
});