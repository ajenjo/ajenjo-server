# _save_db_control.coffee

# Parent _controller_app.coffee

changeDataOficialByDB = (strNameData, data) ->
  dataGlobal = $rootScope[strNameData] || []

  logChageGlobalData.log "Data:", "\"#{strNameData}\"" ,"Contiene:", dataGlobal

  logChageGlobalData.log "Leyendo data", data, "e ingresando al la data global \"#{strNameData}\"."

  dataGlobal.push dataValue for indexDataValue, dataValue of data

  #
  # /!\ Proceso de base de datos, almacenamiento y control de datos existentes.
  #



# Declarando las Memorias de la db Temporal
$rootScope.db =
  groups: []


# Control de actualizacion a la base de datos
#
# Objetivo: al actualizar el contenido en la variable rootScope.db.<data>,
# este se almacene en la base de datos.
$rootScope.$watch 'db.groups', changeDataGroups = (newData, oldData) ->

  countGroupToDB = 0
  countGroupToDB++ for group in $rootScope.db.groups

  if countGroupToDB > 0 # si existe a los menos un valor
    activitySaveDbGroups = controlActivities.get 'activity_save_db_groups'


    # Almacena de forma local los datos
    changeDataOficialByDB('groups', newData)

    logSaveGlobalData.log "Limpiando data 'groups' temporal de la db (\"db.groups\")."
    $rootScope.db.groups = []


    do activitySaveDbGroups.end
    do $rootScope.$apply


