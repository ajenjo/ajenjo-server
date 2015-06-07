# _controller_recoveryPassword.coffee
#

controller 'recoveryPasswordCtrl', [
  '$scope'
  '$sails'
  'log'
  'controlActivities'
  '$rootScope'
  ], ($scope, $sails, log, controlActivities, $rootScope) ->


    logRecoveryPassword = new log 'Recovery Password'

    $scope.isErrorOnSystem = false
    $scope.isSendEmail     = false
    $scope.isNoSendEmail   = false


    $scope.data =
      email: null


    $scope.keyToCreateRecovery = ($event) ->
      if $event.keyCode is 13
        do sendRecovery


    sendRecovery = ->

      sinEstado    = -1
      desconectado = 0
      conectado    = 1

      if $rootScope.appIsConnect is sinEstado or $rootScope.appIsConnect is desconectado
        $scope.isErrorOnSystem = true
      else

        activityRecoveryPassword = controlActivities.get 'Recovery Password'

        callRecoveryPassword = $sails.post '/api/recovery', $scope.data

        callRecoveryPassword.success (data, status, headers, jwr) ->

          logRecoveryPassword.log 'Return Data Recovery:', data

          $scope.isErrorOnSystem = data.errorServer

          if data.isSendEmail
            $scope.isSendEmail = true
            $scope.isNoSendEmail = false
          else
            $scope.isSendEmail = false
            $scope.isNoSendEmail = true



        callRecoveryPassword.error (data, status, headers, jwr) ->
        callRecoveryPassword.finally (data, status, headers, jwr) ->
          do activityRecoveryPassword.end



    if config.dev
      $scope.data.email = "a@e.c"


    # Declaración el el scope
    $scope.sendRecovery = sendRecovery
