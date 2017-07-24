angular.module('accumulatorApp', [])
  .controller('AccumulatorController', ['$scope', '$http', function ($scope, $http) {

    $scope.accumulator = [];
    $scope.item = '';
    $scope.enabled = false;
    $scope.initialized = false;

    $scope.add = function () {
      $scope.enabled = false;
      $scope.addMessage = "";
      $http.post('/api', { "message": $scope.item })
        .then(function success(response) {
          $scope.accumulator.unshift(response.data);
          $scope.item = '';
          $scope.enabled = true;
        }, function error(reason) {
          $scope.addMessage = "Failed to add message.";
          $scope.enabled = true;
        });
    }

    $scope.init = function () {
      $http.get('/api')
        .then(function success(response) {
          $scope.accumulator = response.data;
          $scope.initialized = true;
          $scope.enabled = true;
          console.log("Initialized")
        }, function error(reason) {
          console.log("Failed to initialize. Retrying shortly...")
          setTimeout($scope.init, 3000);
        });
    }

    $scope.toggleEmphasis = function (item) {
      if(item.emphasis === undefined) {
          item.emphasis = false;
      }
      item.emphasis = !item.emphasis;
      $http.put('/api', item)
        .then(function success () {},
          function error(reason) {
            console.log("Failed to toggle emphasis.");
          });
    }

  }]);