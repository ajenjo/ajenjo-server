# _controller_login.coffee

controller 'loginCtrl', [
  '$scope'
  '$sails'
  'log'
  '$rootScope'
  'controlActivities'
  '$location'
  ],
  ($scope, $sails, log, $rootScope, controlActivities, $location) ->
    # Declara loginError
    $scope.loginError = false

    logLogin = new log 'Login'

    $scope.data =
      usernameOrEmail: null
      passwordVerific: null
      rememberAccount: false

    $scope.dataResult = {}
    $scope.loginError = false




    $rootScope.$watch "status.login", (nSts, oSts) ->
      if nSts is true
        $location.url "/session/close"



    $scope.keyToCreateSession = ($event) ->
      if $event.keyCode is 13
        do createSession

    createSession = ->
      activityCrearUnaSesion = controlActivities.get 'activity_crear_una_sesion'

      if $rootScope.appIsConnect <= 0

        $scope.loginError   = false
        $scope.loginCorrect = false
        $scope.errorSys     = true

        do activityCrearUnaSesion.end

      else

        callLogin = $sails.post '/api/login', $scope.data

        callLogin.success (data, status, headers, jwr) ->
          $scope.dataResult = data

          # if data.status is 1
          # #   # ...
          #   window.document.location = "http://google.cl"


          $scope.loginError   = data.loginError
          $scope.loginCorrect = data.loginCorrect
          $scope.errorSys     = false


        callLogin.error   (data, status, headers, jwr) ->
          $scope.dataResult = data

          $scope.loginError   = false
          $scope.loginCorrect = false
          $scope.errorSys     = false


          logLogin.log "El inicio de sesion ha fallado."


      callLogin.finally (data, status, headers, jwr) ->
        do activityCrearUnaSesion.end


    $scope.login = createSession


    if config.dev
      $scope.data.usernameOrEmail = 'a'
      $scope.data.passwordVerific = '1234'



