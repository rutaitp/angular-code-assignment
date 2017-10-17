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
    // consoles the selectedCharacter URL
    console.log($scope.selectedCharacter);

    // gets inside that URL and reads the data (object)
    // later we take films part from the object in index.html
    $http.get($scope.selectedCharacter)
      .then(function(response) {
        $scope.apiData = response.data;
        console.log($scope.apiData);

        // try console'ing only films part
        console.log($scope.apiData.films);

        var allLinks = $scope.apiData.films;

        // loop through the links and get the data from each
        for (var i=0; i<allLinks.length; i++) {
          var oneLink = allLinks[i];
          console.log(oneLink);

          // read each link and console.log the data from it
          $http.get(oneLink)
            .then(function(response) {
              $scope.oneLinkData = response.data;
              console.log($scope.oneLinkData.title);
            });

        }
      });
  }
  
});