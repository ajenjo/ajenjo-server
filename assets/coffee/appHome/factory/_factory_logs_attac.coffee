# appHome :: factory/_factory_logs_attac.coffee

# Crea estructuas de mensajes
#
# Example:
#
# ## Crear una nueva alerta
#
# ```coffeescript
# logModuleUser = new log 'Module User'
# ```
#
# ## Alerta Simple
#
# ```coffescript
# data = [3,67,2]
#
# logModuleUser.log 'Se muestran los siguientes errores: ', data
# ```
#
# ## Crea una sub alerta
#
# ```coffeescript
# logSubModuloUser = new log 'Sub Modulo', logModuleUser
# user = "Loqui"
#
# logSubModuloUser.log 'Se esta cargando el usuario:', user
# ```
#
# ## Crea un alerta de error
#
# ```coffeescript
# logSubModuloUser.error 'No se ha podido cargar el usuario:', user
# ```

factory 'log', ->

  aArray = (arrs)->
    arrReturn = []
    for index, arr of arrs
      if Array.isArray arr
        for indexSArr, SArr of arr
          arrReturn.push SArr
      else
        arrReturn.push arr

    # console.log arrReturn
    arrReturn



  # Genera logs basados
  # log54126
  class log

    constructor: (
      @header     = null,
      @preModule  = null,
      @separator  = " > ",
      @styles     = {color : "green"},
      @stylesErr  = {color : "red"},
      @virtualLog = console.log
      ) ->


    getHeaderArr: ->
      # ["%c#{@header}", ("#{keyStyle}:#{style};" for keyStyle, style of @styles)...]
      ["#{@header}"]

    # Retorna una cabezera con todas las etiqueas del log y de los logs padres
    createTagLog: ->
      if @preModule?

        tags = []
        tags.push do @preModule.createTagLog
        tags.push do @getHeaderArr

      else
        tags = do @getHeaderArr

      aArray tags

    getHeaderInline: ->
      ("#{e}" for e in do @getHeader).join(@separator)

    getHeader: ->

      ret = (i for k,i of do @createTagLog)
      ret

    getSkeletonHeader: (styles) ->

      preMsgs = []
      headerInline = do @getHeaderInline
      getNewTime = new Date

      preMsgs.push "%c["

      if config.log_view_time
        preMsgs.push "#{getNewTime.toLocaleTimeString()} #{getNewTime.toLocaleDateString()}#{config.log_simbol_end_time}"

      preMsgs.push headerInline
      preMsgs.push "]:"

      preMsgs = [("#{e}" for e in preMsgs).join(''), ("#{n}:#{s}" for n,s of styles).join(';')]


    log: (msgs...) ->
      preMsgs = []

      preMsgs.push (@getSkeletonHeader @styles)...
      preMsgs.push msgs...

      if config.dev then console.log.apply console, preMsgs

    error: (msgs...) ->
      preMsgs = []

      preMsgs.push (@getSkeletonHeader @stylesErr)...
      preMsgs.push msgs...

      if config.dev then console.log.apply console, preMsgs


  return log
