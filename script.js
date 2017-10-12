// Instantiate the app, the 'myApp' parameter must 
// match what is ins ng-app
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

  $scope.execute = function () {
    console.log($scope.selectedCharacter);

    $http.get($scope.selectedCharacter)
      .then(function(response) {
        $scope.apiData = response.data;
        console.log($scope.apiData);

        //try looping here
      });
  }

  //execute another function that reads each link and gets data from it
  //execute function -> for as much as there is data, do $http.get for each link and get response.data

  // DOES NOT WORK
  // add another scope to read each film link
  // first console each link
  // $scope.show = function () {
  //   console.log($scope.filmDisplay);
  // }
  
});