# _controller_close_sesion.coffee
controller 'closeSesionCtrl', [
  '$scope'
  '$rootScope'
  'log'
  '$location'
  '$sails'
  ], ($scope, $rootScope, log, $location, $sails) ->

    logCloseSesion = new log "Close Sesion"

    $rootScope.$watch "status.login", (nSts, oSts) ->
      if nSts is false
        $location.url "/login"


    close_session = ->
      logCloseSesion.log "Is Close Sesion Event."


      $sails.get "/api/logout"
        .success (data, status, headers, jwr) ->
          logCloseSesion.log "The logout incorrecto."




    $scope.close_session = close_session
