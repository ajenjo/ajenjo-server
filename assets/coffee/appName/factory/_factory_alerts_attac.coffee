# _factory_alerts_attac.coffee
factory 'alert', ->
  class alert

      # Data Alert
      alerts      : []
      modelAlert  : {type: 'warning', message: ''}

      _onLogs: []

      # Evento para genera un log
      onLog: (fn) ->
        @_onLogs.push fn

      # Function Alert
      newAlert    : (data) ->

        # Crea un model de la alerta
        modelAlert = angular.copy @modelAlert

        # Asocia los valores a la alerta
        modelAlert.message = data.msg or data.message if data?.msg? or data?.message?
        modelAlert.type    = data.type if data?.type?

        # Genera los logs
        logs data, modelAlert for logs in @_onLogs

        # Crea la alerta
        @alerts.push modelAlert

      removeAlert : (indexAlert) -> @alerts.splice indexAlert, 1

  alert
