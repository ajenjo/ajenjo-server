### Gestiona los permisos ###
controller 'AppCtrl', [
  '$scope'
  '$rootScope'
  '$log'
  'log'
  'controlActivities'
  '$sails'
  '$location'
  ],
  ($scope, $rootScope, $log, log, controlActivities, $sails, $location) ->


    $rootScope.title = 'Login'

    logControllerApp       = new log 'Ctrl APP'
    logSails               = new log 'Sails', logControllerApp
    logStatusConnectionApp = new log 'Status Connection', logControllerApp


    do ->

      callToGetTestMessages = ->

        solicitaMensajeDeTest = $sails.get '/test'

        solicitaMensajeDeTest.success (data, status, headers, jwr) ->
          $rootScope.reqExperimental = data

      $sails.on 'connect', callToGetTestMessages

      $rootScope.callTest = callToGetTestMessages

    # Control de estado, si se precenta la aplicacion conectada o no. Permite
    # leer una variable global que identifica su estado.
    do ->
      sinEstado    = -1
      desconectado = 0
      conectado    = 1

      timeToTimeoutConnect = config.sails_time_to_declare_disconect

      $rootScope.appIsConnect = sinEstado

      setAppInDisconectOfTiemOut = ->
        if $rootScope.appIsConnect is sinEstado
          $rootScope.appIsConnect = desconectado
          logStatusConnectionApp.log "Se cambio el estado de la aplicación debido a no estar conectado en", timeToTimeoutConnect, "segundos."
          try do $rootScope.$apply

      setTimeout setAppInDisconectOfTiemOut, timeToTimeoutConnect

      # $rootScope.appIsConnect = desconectado
      $sails.on 'connect', () ->
        logStatusConnectionApp.log "Se ha conectado la aplicación."
        $rootScope.appIsConnect = conectado

      $sails.on 'disconnect', () ->
        logStatusConnectionApp.log "Esta ha desconectado la aplicación."
        $rootScope.appIsConnect = desconectado
