# # _angular_saveDb.coffee

# module
#   # .module [
#   #   'saveDb'
#   # ]
#   .config [
#     '$provide'
#     ($provide) ->
#       $provide.provider 'saveDb', ->

#         urlDefault: 'http://echo.jsontest.com/'

#         $get: [
#           '$http'
#           'log'
#           ($http, log) ->
#             logHttp = new log 'Provider $http'

#             get: (path) ->
#               logHttp.log  'Consultando el path:', path, @urlDefault

#               $http.get "#{@urlDefault}#{path}"

#         ]
#   ]
