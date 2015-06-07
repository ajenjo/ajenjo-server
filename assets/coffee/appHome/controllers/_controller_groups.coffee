# _controller_groups.coffee

controller 'groupsCtrl', [
  '$scope'
  '$rootScope'
  'search'
  ],
  ($scope, $rootScope, search) ->
    $scope.groups = $rootScope.groups

    # Init Search
    $scope.search = new search


