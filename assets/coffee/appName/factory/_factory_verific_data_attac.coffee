# _factory_verific_data_attac.coffee

#
# Contiene una serie de funciones que permite validar siertos tipos de datos.
#
# Por ejemplo
#
# verificData.isEmpty('')
#

factory 'verificData', ->

  # Match RegExp
  domain          = "[a-zA-Z0-9\\.\\_\\-]+\\.[a-zA-Z0-9]+"
  email           = "[a-zA-Z0-9\\_\\-\\.\\%]+\\@#{domain}"
  web             = "[a-zA-Z0-9\\?\\$\\#\\/\\:\\.\\-_%\\&]+"
  nameEmail       = "\"{0,}([a-zA-Z][a-zA-Z ]+)\"{0,}\\s{0,}<(#{email})>"
  nameEmailWeb    = "#{nameEmail}[\\s]{0,}\\((#{web})\\)"
  emailWeb        = "<(#{email})>[\\s]{0,}\\((#{web})\\)"
  nameAndLastName = "\"{0,}([a-zA-Z]+)([a-zA-Z ]+)\"{0,}"

  regexp:
    email           : email
    nameEmail       : nameEmail
    nameEmailWeb    : nameEmailWeb
    emailWeb        : emailWeb
    nameAndLastName : nameAndLastName

  isEmpty: (value) ->
    !value

  useSymbol: (symbol, value) ->
    valueFindSymbol = value?.indexOf? symbol
    valueWithSymbol = valueFindSymbol isnt -1 and valueFindSymbol isnt undefined

    valueWithSymbol

  isEmail: (value) ->
    Boolean /^[a-zA-Z0-9\._%\+\-]+@[a-zA-Z0-9\-\+]+\.[a-zA-Z0-9]+$/ig.exec value
