# _controller_users.coffee

controller 'usersCtrl', [
  '$scope'
  '$rootScope'
  'log'
  'search'
  ], ($scope, $rootScope, log, search) ->
    $scope.type = 'user'
    $scope.is   = (type) -> $scope.type == type

    # Init Search
    $scope.search = new search

    logModuleUser = new log 'Module User'

    $scope.users = $rootScope.users






