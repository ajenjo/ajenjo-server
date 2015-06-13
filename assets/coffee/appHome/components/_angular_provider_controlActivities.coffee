# appHome :: components/_angular_provider_progressBar.coffee

# Example:
#
# Crear una actividad
#
# ```coffeescript
# activity1 = controlActivities.new 'test_activity_n1'
# ```
#
# Con un evento callback
#
# ```coffeescript
# activity2 = controlActivities.new 'test_activity_n1', ->
#       console.log "Saludos desde el evento callback."
# ```
#
# Agregar un callback a la actividad ya creada.
#
# ```coffeescript
# activity1.callback ->
#     console.log "Saludos desde el callback agregado."
# ```
#
# Agregar un callback final, ayuda a crear eventos que solo se pueden ejecutar si un collback normal ya ha sido ejecutado y solo se puede ejecutar cuando la actividad se este cerrando con el metodo `end()`.
#
# ```coffeescript
# activity1.endCallback ->
#     console.log "Cerrando la actividad."
# ```
#
# Finalizar una actividad
#
# ```coffeescript
# do activity1.end
# ```
#

module
  .config [
    '$provide'
    ($provide) ->
      $provide.provider 'controlActivities', controlActivities = ->

        #
        # | Activity             |
        # | -------------------- |
        # | - _callbacks:Array   |
        # | -------------------- |
        # | + callback: function |
        #
        class activity

          constructor : (callback, @callbacks = [], @endCallBack = []) ->
            if callback?
              @callback callback

          runAllCallBack : ->
            try do callback for indexCallback, callback of @callbacks

          callback : (callback) ->
            @callbacks.push callback

          endCallback : (callback) ->
            @endCallBack.push callback

          end : ->
            try do @runAllCallBack
            try do callbackEnd for indexCallback, callbackEnd of @endCallBack



        activities =
          created           : 0
          finished          : 0
          lastCountInactive : 0
          _list: {
            # object:activity
          }



        historyActivities = []


        logControlActivities = console.log


        countActivitiesActives = -> Object.keys(activities._list).length
        existsActivities       = -> do countActivitiesActives isnt 0
        getActivitiesCreated   = -> activities.created
        getActivitiesFinished  = -> activities.finished
        newActivity            = (nameActivity, callBackActivities) ->
          activityCreated = new activity callBackActivities

          if not activities._list[nameActivity]?
            activities.created++
            historyActivities.push activityCreated

            activityCreated.endCallback ->
              logControlActivities.log "Se esta finalizando la actividad #{nameActivity}."
              activities.finished++

              delete activities._list[nameActivity]

              # Asociando el ultimo conteo actividades creadas
              if not do existsActivities
                activities.lastCountInactive = activities.created

              # Refresca las vista
              do refreshViews

            # Asocia la actividad a la lista
            activities._list[nameActivity] = activityCreated

            # Evita replicas del evento
            getActivity nameActivity
          else
            false



        getActivity = (nameActivity) ->
          activityFind = activities._list[nameActivity]

          if not activityFind?
            activityFind = newActivity nameActivity

          activityFind


        getPercent = ->
          created   = do getActivitiesCreated
          finished  = do getActivitiesFinished
          countLast = activities.lastCountInactive

          # Algoritmo resultante
          result = (finished - countLast) / (created - countLast)
          if not do existsActivities
            1
          else
            result || 0

        getHistory = -> activities._list

        rootScope = null

        refreshViews = ->
          do rootScope?.$apply?

        $get: [
          '$rootScope'
          'log'
          '$interval'
          ($rootScope, log, $interval) ->
            logControlActivities = new log "Control Activities"

            createRootScope = ->
              rootScope = $rootScope

            do createRootScope

            {
              "count"    : countActivitiesActives
              "created"  : getActivitiesCreated
              "finished" : getActivitiesFinished
              "get"      : getActivity
              "new"      : newActivity
              "percent"  : getPercent
              activity
              countActivitiesActives
              existsActivities
              getActivitiesCreated
              getActivitiesFinished
              getActivity
              getHistory
              getPercent
              newActivity
            }

        ]

  ]
