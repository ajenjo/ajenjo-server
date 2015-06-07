### Controladores ###

controller = (name_controller, modules_param, fn_controller) ->
  modules_param.push fn_controller
  app.controller name_controller, modules_param

#= require controllers/_*.coffee

### End Comtroladores ###
