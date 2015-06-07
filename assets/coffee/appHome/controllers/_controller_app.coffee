### Gestiona los permisos ###
controller 'AppCtrl', [
  '$scope'
  '$rootScope'
  '$log'
  'log'
  'controlActivities'
  '$sails'
  ],
  ($scope, $rootScope, $log, log, controlActivities, $sails) ->
    $rootScope.title = 'Ajenjo'

    logChageGlobalData     = new log 'Change Data', logSaveGlobalData
    logControllerApp       = new log 'Ctrl APP'
    logSaveGlobalData      = new log 'Save Global Data', logControllerApp
    logStatusConnectionApp = new log 'Status connection', logControllerApp



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



    $sails.on 'message_test', (req) ->
      logControllerApp.log "Se ha recibido un estatus de parte del backend este dice:", req.text



    logControllerApp.log 'El modo de desarrollador esta activo.'



    # Include data Groups
    #= require ../data/_list_groups.coffee
    if not groups? then groups = []

    # Include data Users
    #= require ../data/_list_users.coffee
    if not users? then users = []

    # Include data Permissions
    #= require ../data/_list_permissions.coffee
    if not permissions? then permissions = []

    # Variables
    $rootScope.groups      = groups
    $rootScope.permissions = permissions
    $rootScope.users       = users





    # DB control
    #= require ./module/_save_db_control.coffee





