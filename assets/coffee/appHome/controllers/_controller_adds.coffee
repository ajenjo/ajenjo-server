# appHome :: controllers/_controller_adds.coffee

controller 'addsCtrl', [
  '$scope'
  '$routeParams'
  '$location'
  ],
  ($scope, $routeParams, $location) ->

    $scope.tab = tab = $routeParams.type_adds

    # console.log $scope



