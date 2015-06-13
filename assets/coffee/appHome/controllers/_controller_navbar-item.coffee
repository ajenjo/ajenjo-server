# appHome :: controllers/_controller_navbar-item.coffee
controller 'navbarCtrl', [
  '$scope'
  '$location'
  ],
  ($scope, $location) ->
    $scope.$location = $location
