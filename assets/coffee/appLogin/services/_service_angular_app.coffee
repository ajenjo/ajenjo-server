# _service_angular_app.coffee

if angular?

  # Carga el archivo con las configuraciones de la app.
  #= require ../_config.coffee

  # Contiene la memoria para los componentes
  ___components =
    configs   : []
    # directive : []
    modules   : []



  # Service Modulos
  #= require _service_angular_directive.coffee
  #= require _service_angular_moduler.coffee
  #= require _service_angular_factory.coffee
  #= require _service_angular_provider.coffee



  # Modulos
  #= require ../components/_*.coffee
  # Fin de Modulos



  #
  # Include APP
  # Inicializa la palicación cargando los modulos y la app.
  # require el nombre definida en las configuraciones
  #
  app = angular.module config.app_name, ___components.modules

  # Include All Factorys
  #= require ../factory/_*.coffee

  # Load Provider
  #= require ../provider/_*.coffee

  ### Carga la aplicación ###
  #= require ../_app.coffee
  ### Fin de Carga la aplicación ###

  #= require ../directives/_*.coffee

  #
  # Carga las configuraciones de los componentes
  #
  for k, mconfig of ___components.configs
    app.config mconfig
