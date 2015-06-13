# Module Route

module
  .module [
    'ngRoute'
  ]
  .config [
    '$routeProvider'
    '$locationProvider'
    ($routeProvider, $locationProvider) ->

      route = (path, config) ->

        # Ruta por defecto
        if path == 'otherwise'
          $routeProvider.otherwise config
        else
          # Si la ruta es un string
          if typeof path is 'string' or path instanceof String
            $routeProvider.when path, config
          # Si la ruta es un Array
          else if Array.isArray path
            for keyPath, spath of path
              route spath, config
          else
            console.warn "El path", path, "requiere que sea un Array<String> o String."

      # Carga las rutas definidas
      #= require ../_routes.coffee


      $locationProvider.html5Mode
        enable: false
        requireBase: false
  ]
