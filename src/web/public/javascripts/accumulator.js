angular.module('accumulatorApp', [])
  .controller('AccumulatorController', ['$scope', '$http', function ($scope, $http) {

    $scope.accumulator = [];
    $scope.item = '';
    $scope.enabled = false;

    $scope.add = function () {
      $scope.enabled = false;
      $http.post('/api', { "message": $scope.item })
        .then(function success(response) {
          $scope.accumulator.unshift(response.data);
          $scope.item = '';
          $scope.enabled = true;
        });
    }

    $scope.init = function () {
      $http.get('/api')
        .then(function success(response) {
          $scope.accumulator = response.data;
          $scope.enabled = true;
        });
    }

    $scope.toggleEmphasis = function (item) {
      if(item.emphasis === undefined) {
          item.emphasis = false;
      }
      item.emphasis = !item.emphasis;
      $http.put('/api', item);
    }

  }]);