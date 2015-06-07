# _controller_reset_password.coffee

controller 'resetPassword', [
  '$scope'
  '$sails'
  'log'
  'controlActivities'
  '$rootScope'
  ],
  ($scope, $sails, log, controlActivities, $rootScope) ->



    config =
      minLengthPolycy: 6



    passwordPolicy =
      minLength: (nMin = config.minLengthPolycy) ->
        if data.password.length >= nMin then true
        else false
      withUppercase: ->
        if /[A-Z]/g.exec(data.password) then true
        else false
      withLowercase: ->
        if /[a-z]/g.exec(data.password) then true
        else false
      withNumber: ->
        if /[0-9]/g.exec(data.password) then true
        else false
      withSign: ->
        if ///[
          \°\|\¬\!\"\#\$\%\&\/\(\)\=\?\'\\\¿\¡\´\¨\*\+\~\[\]\{\}\^\`\;\,\:\.\-\_\s
          ]///ig.exec(data.password) then true
        else false

    policyRequired = ['minLength']

    data =
      password: ''
      repeatPassword: ''
      getLevelPassword: ->
        policies = [
          do passwordPolicy.minLength
          do passwordPolicy.withLowercase
          do passwordPolicy.withNumber
          do passwordPolicy.withSign
          do passwordPolicy.withUppercase
          passwordPolicy.minLength 10
        ]

        numberToTruePolicies = 0
        numberTotalPolicies = policies.length

        for policySingular in policies
          if policySingular
            numberToTruePolicies++

        levelPassword = (numberToTruePolicies / numberTotalPolicies) * 100

        console.log levelPassword

        levelPassword

      getTypePassword: ->
        levelPassword = do data.getLevelPassword

        switch
          when levelPassword < 25  then 'danger'
          when levelPassword < 50  then 'warning'
          when levelPassword < 75  then 'info'
          when levelPassword < 100 then 'default'
          else 'success'


      isValidPassword: ->
        isValid = true
        arrVerificaciones = (try do passwordPolicy[policyVerific] for policyVerific in policyRequired)

        for verific in arrVerificaciones
          if verific is false then isValid = false

        isValid

      isValidRepeatPassword: ->
        if data.password is data.repeatPassword then true
        else false



    $scope.configCtrl = config
    $scope.data       = data
    $scope.policy     = passwordPolicy
