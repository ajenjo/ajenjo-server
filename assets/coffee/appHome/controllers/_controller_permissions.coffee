# appHome :: controllers/_controller_permissions.coffee

controller 'permissionCtrl', [
  '$scope'
  '$rootScope'
  'search'
  ],
  ($scope, $rootScope, search) ->
    $scope.permissions = $rootScope.permissions

    # Init Search
    $scope.search = new search


