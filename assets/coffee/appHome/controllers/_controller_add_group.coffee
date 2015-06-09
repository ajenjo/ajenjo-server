# appHome :: controllers/_controller_add_group.coffee

# Controlador par agregar un nuevo grupo.

# - Mantener un listado temporal.
# - Editar Listado temporal.
# - Guardar en el listado general.
# - Guardar en la base de datos.

controller 'add_group', [
  '$scope'
  '$log'
  '$rootScope'
  'messages'
  'log'
  'alert'
  'verificData'
  'controlActivities'
  ], ($scope, $log, $rootScope, messages, log, alert, verificData, controlActivities) ->
    # Parámetros de configuración del Modulo
    $scope.type = 'group'
    $scope.is   = (type) -> $scope.type == type

    logAddGroup        = new log 'Module Grups Add'
    logSaveGroups      = new log 'Save Groups', logAddGroup
    logValidationGroup = new log 'Validate Group', logAddGroup
    logRemoveAlerts    = new log 'Remove Alerts', logAddGroup

    # Change Title
    $rootScope.title = 'Nuevo grupo'

    $scope.alerts      = []
    $scope.alertsFixed = []
    indexAlerts =
      keyAlertDanger: -1
    $scope.removeAlert      = removeAlert      = (indexAlert) ->
      logRemoveAlerts.log "Eliminando la alerta en la posición", indexAlert
      $scope.alerts.splice indexAlert, 1
    $scope.removeAlertFixed = removeAlertFixed = (indexAlert) ->
      logRemoveAlerts.log "Eliminando la alerta fija en la posición", indexAlert
      $scope.alertsFixed.splice indexAlert, 1

    clearAlertsFixed = ->
      removeAlertFixed indexAlert for indexAlert, alert of $scope.alertsFixed



    $scope.data =
      groupsAdd: [] # Grupos para agregar.



    # Funciones para validaciones
    ruleValidaIfExistsOnGroups = (keyGroup) ->
      existGroup = false
      for _keyGroup, group of $rootScope.groups
        existGroup = true if group.key is keyGroup
      !existGroup

    ruleValidaIfExistsOnLocalGroups = (keyGroup) ->
      countExistGroup = 0
      for _keyGroup, group of $scope.data.groupsAdd
        countExistGroup = countExistGroup + 1 if group.key is keyGroup

      if countExistGroup <= 1 then true
      else false

    ruleValidationIfCorrectSyntaxKeyGroup = (keyGroup) ->
      expressionRun = ///
        ^
          [
            a-z
            0-9
            _
            -
          ]+
        $
      ///gi
      isCorrectTheRegularExpression = expressionRun.exec keyGroup
      # logValidationGroup.log "Resultado de la búsqueda", expressionRun, "es", isCorrectTheRegularExpression, "de", keyGroup

      Boolean isCorrectTheRegularExpression

    validationGroup = (group) ->
      isValid = true

      isValid = false if not ruleValidaIfExistsOnGroups group.key
      isValid = false if not ruleValidaIfExistsOnLocalGroups group.key
      isValid = false if not ruleValidationIfCorrectSyntaxKeyGroup group.key

      isValid



    isValidGroupKey = (group) ->
      isEmpty      = verificData.isEmpty group.key
      isValidGroup = validationGroup (group)
      # logValidationGroup.log "Group Key:", group.key, "| Validation success isValidGroup:", isValidGroup, "Is Empty:", isEmpty

      if isEmpty then false
      else if isValidGroup then true
      else false



    isDangerGroupKey = (group) ->
      isEmpty      = verificData.isEmpty group.key
      isValidGroup = validationGroup (group)
      # logValidationGroup.log "Validation Danger isValidGroup:", isValidGroup, "Is Empty", isEmpty

      if isEmpty then false
      else if not isValidGroup then true



    # Barra de procesos
    progressbarPropieties =
      max    : 100
      status : false # Activado o Desactivado
      text   : ''
      type   : "default"
      value  : 100



    saveAllGroupsAdds = ->
      captureGroups = $scope.data.groupsAdd

      activitySaveAllGroups = controlActivities.get 'save_all_groups'

      gruposListosParaGuardar = ({key: group.key, name: group.name} for key, group of captureGroups when isValidGroupKey group)
      gruposErroneos          = (group.key for key, group of captureGroups when isDangerGroupKey group)



      do clearAlertsFixed



      # Si existe a lo menos un grupo con errores
      if gruposErroneos.length > 0
        logSaveGroups.error "Se encontraron que los grupos con la claves", gruposErroneos, "no se pueden ingresar."

        stringGruposErroneos = ("\"#{grupoKey||''}\"" for grupoKey in gruposErroneos).join(", ")

        indexAlerts.keyAlertDanger = 1 - $scope.alertsFixed.push
          type: "danger"
          message: "
            <strong>Advertencia:</strong> Los grupos #{stringGruposErroneos} no
            nos son posible agregarlos debido a que puede estar replicados o mal
            escrito.
            <br>
            <strong>Nota:</strong> <i>Por favor revisar los campos en rojo.</i>
            "



      # Si existe a lo menos un grupo ara guardar
      else if gruposListosParaGuardar.length > 0
        logSaveGroups.log "Están listo para agregar los grupos", (group.key for group in gruposListosParaGuardar)

        activitySaveDbGroups = controlActivities.get 'activity_save_db_groups'



        # Almacena en la base de datos
        $rootScope.db.groups = gruposListosParaGuardar

        $scope.statusLoadSaveGroup = true

        activitySaveDbGroups.callback ->

          $scope.statusLoadSaveGroup = false

          indexAlerts.keyAlertCompleteUploadData = 1 - $scope.alertsFixed.push
            type: "success"
            message: "
              Los datos han sido guardados correctamente. Visita los <a href=\"#/groups\" class=\"alert-link\">grupos</a>
              para revisar los grupos que acabas de ingresar.
            "


        logSaveGroups.log "Limpiando la data local de los grupos. Eliminado", captureGroups.length, "datos."


      # Si no existe ningún grupo.
      else
        $scope.alerts.push
          type: "warning"
          message: "
            <strong>Advertencia:</strong> No existe ningún grupo para agregar.
          "


      activitySaveAllGroups.end()

    # if config.dev
    #   $scope.data.groupsAdd.push
    #     key: "name_1"



    $scope.hsA = controlActivities.getHistory


    $scope.dangerKey   = isDangerGroupKey
    $scope.progressbar = progressbarPropieties
    $scope.save        = saveAllGroupsAdds
    $scope.validateKey = isValidGroupKey

