# appHome :: controllers/_controller_add_permission.coffee

controller 'add_permission', [
  '$scope'
  '$log'
  ], ($scope, $log) ->
    # Parámetros de configuración del Modulo
    $scope.type = 'permission'
    $scope.is   = (type) -> $scope.type == type
