# _service_angular_moduler.coffee

# Permite cagar los modulos desde una fuente externa.
module =
  module: (arr_str_modules) ->
    for key, smodule of arr_str_modules
      ___components.modules.push smodule
    return module
  config: (arr_config) ->
    ___components.configs.push arr_config
    return module
