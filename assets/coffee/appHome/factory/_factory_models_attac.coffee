# _factory_models_attac.coffee
#
# Crea componente para el Model.
#
# Es capas de administrar distintos tipos de modelos que facilitan el control
# de datos basados en multidatos y poder validad cada dato.
#

factory 'model', ->
# app.service 'model', ->

  class cModel

    constructor: (model) ->
      @model = model if model?

    # Contienes los modelos generados
    models : []

    # Contiene el modelo base del objeto
    model : {}

    _validates : {}

    # Instrucciones para validar el modelo
    validate : (name, fn) ->
      @_validates[name] = fn



    # Genera un nuevo modelo basado en una data ingresada
    add: (dataToModel) ->
      if not dataToModel?
        dataToModel = {}

      preModel = angular.copy @model

      isPush = false

      # Recorre el model de la data
      for indexSPreModel, sPreModel of preModel
        if dataToModel[indexSPreModel]?
          isPush = true
          preModel[indexSPreModel] = dataToModel[indexSPreModel]

      # Incluye las funciones en el modelo
      for nameValid, fnValid of @_validates
        preModel[nameValid] = fnValid
        # console.log nameValid, preModel
        # fnValid()

      if isPush then @models.push preModel

    # Elimian un modelo asociado
    remove: (index) ->
      @models.slice index, 1

    save: (storage) ->

      for model in @models
        for nameValid, fnValid of @_validates
          delete model[nameValid]
        # console.log model
        storage.push model


  cModel
