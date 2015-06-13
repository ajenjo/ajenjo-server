# Gestiona los permisos
controller 'AppCtrl', [
  '$scope'
  '$rootScope'
  '$log'
  'log'
  'controlActivities'
  '$sails'
  ],
  ($scope, $rootScope, $log, log, controlActivities, $sails) ->
    $rootScope.title = 'Login'

    logControllerApp       = new log 'Ctrl APP'


