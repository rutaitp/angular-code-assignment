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
        // consoles entire object
        console.log($scope.apiData);

        // console only films array
        console.log($scope.apiData.films);

        var allTitles = [];

        // looping through movie link array
        angular.forEach($scope.apiData.films, function(value) {
          // consoles each link
          console.log(value);

          //and getting data from each
          $http.get(value)
            .then(function(response) {

              $scope.valueData = response.data;
              console.log($scope.valueData.title);

              // //try loop through each response
              // angular.forEach(response, function(title) {
              //   $scope.valueData = response.data;
              //   console.log($scope.valueData.title);
              // });

            });
        });
      });
  }
  
});