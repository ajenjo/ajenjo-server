# _angular_ngSails.coffee

module
  .module [
    'ngSails'
  ]
  .config [
    '$sailsProvider'
    ($sailsProvider) ->
      # $sailsProvider.url = "http://localhost:1337/"
      # $sailsProvider.url = "/"
      $sailsProvider.autoConnect = true
      $sailsProvider.useCORSRouteToGetCookie = true


      # do ->
      #   setAutorun = -> try do _sailsIoJSConnect

      #   setTimeout setAutorun, 5000


  ]
