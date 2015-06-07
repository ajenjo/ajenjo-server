# _controller_navbar-item.coffee
controller 'navbarCtrl', [
  '$scope'
  '$location'
  ],
  ($scope, $location) ->
    $scope.$location = $location
