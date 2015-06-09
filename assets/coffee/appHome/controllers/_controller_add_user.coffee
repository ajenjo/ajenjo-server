# appHome :: controllers/_controller_add_user.coffee

controller 'add_user', [
  '$scope'
  '$rootScope'
  'log'
  'verificData'
  '$http'
  ], ($scope, $rootScope, log, verificData, $http) ->
    # Parámetros de configuración del Modulo
    $scope.type     = 'user'
    $scope.is       = (type) -> $scope.type == type
    # $scope.newUserToAdd = -> $scope.data.usersAdd.push {}
    $scope.data     =
      usersAdd : []
      usersAddlongText : ""
      regexToFindEmails: "#{verificData.regexp.emailWeb}|#{verificData.regexp.nameEmailWeb}|#{verificData.regexp.nameEmail}|#{verificData.regexp.email}"


    if config.dev
      $scope.data.usersAddlongText = """
        name1@d.co,
        name2@d.co,
        nombre apellido segundo apellido <name3@do.co>,
        nombre Apellido<name4@d.c> (http://el.sitio/)
        nombre Apellido <name5@b.e>(http://el.sitio/)
        <name6@b.e> (http://el.sitio/)
        """


    $scope.typeInvitation = 'single' # 'bulk' or 'single'

    $scope.toBulk = ->
      $scope.typeInvitation = 'bulk'

    $scope.toSingle = ->
      $scope.typeInvitation = 'single'



    logAddUser                = new log 'Module User Add'
    logSaveUsers              = new log 'Save User', logAddUser
    logCatchingEmailsToAdd    = new log 'Catching Emails', logAddUser
    logParseStringToEmailList = new log 'Parset Email List', logCatchingEmailsToAdd



    $scope.users = $rootScope.users
    logAddUser.log 'Datos cargados desde la variable \'users\' ($rootScope) a variable \'users\' ($scope):', $scope.users



    matchesFind = () ->
      regexToFindEmails = new RegExp $scope.data.regexToFindEmails, "g"
      resultMatchesRegExp = $scope.data.usersAddlongText.match regexToFindEmails
      $scope.data.regexpEnd = resultMatchesRegExp

      logCatchingEmailsToAdd.log 'Capturando Emails usando el Regex', regexToFindEmails, 'Retornando: ', resultMatchesRegExp



    $scope.$watch 'data.usersAddlongText', matchesFind
    $scope.$watch 'data.regexToFindEmails', matchesFind



    # Validaciones del formulario
    successValidation = {
      email: (data) ->
        email = data.email

        if verificData.isEmpty email
          return false

        if verificData.isEmail email
          true
        else
          false
    }

    # Validaciones de formulario para validar datos herroneos
    dangerValidation = {
      email: (data) ->
        email = data.email
        if verificData.isEmpty email
          return false

        if verificData.isEmail email
          false
        else
          true
    }



    bulkEmailToListAccounts = ->
      # RegExp
      matchEmailAndName    = new RegExp verificData.regexp.nameEmail
      matchEmailAndWeb     = new RegExp verificData.regexp.emailWeb
      matchEmailNameAndWeb = new RegExp verificData.regexp.nameEmailWeb
      matchNameAndLastName = new RegExp verificData.regexp.nameAndLastName
      matchOnlyEmail       = new RegExp verificData.regexp.email

      listaDeContactosEncontrados = $scope.data.regexpEnd

      logParseStringToEmailList.log "Lista de contactos encontrados", listaDeContactosEncontrados

      logParseStringToEmailList.log "Clasificando", listaDeContactosEncontrados.length, "Contactos."

      contactosConNombreEmailYWeb = []
      contactosConNombreYEmail    = []
      contactosConEmailYWeb       = []
      contactosSoloEmail          = []

      for contacto in listaDeContactosEncontrados
        isEmailNameAndWeb = contacto.match matchEmailNameAndWeb
        isEmailAndName    = contacto.match matchEmailAndName
        isEmailAndWeb     = contacto.match matchEmailAndWeb
        isOnlyEmail       = contacto.match matchOnlyEmail

        if isEmailNameAndWeb
          contactosConNombreEmailYWeb.push contacto
        else if isEmailAndWeb
          contactosConEmailYWeb.push       contacto
        else if isEmailAndName
          contactosConNombreYEmail.push    contacto
        else if isOnlyEmail
          contactosSoloEmail.push          contacto


      logParseStringToEmailList.log "Los contactos con Nombre Email y Sitio web encontrados", contactosConNombreEmailYWeb
      logParseStringToEmailList.log "Los contactos con Nombre y Email encontrados", contactosConNombreYEmail
      logParseStringToEmailList.log "Los contactos con Email y Web encontrados", contactosConEmailYWeb
      logParseStringToEmailList.log "Los contactos solo con Email", contactosSoloEmail

      logParseStringToEmailList.log "Los usuarios encontrados fueron",
        contactosConNombreEmailYWeb.length +
        contactosConNombreYEmail.length +
        contactosConEmailYWeb.length +
        contactosSoloEmail.length


      tmpMemoriaDeContactosParaAgregar = []

      # Modelo {name,lastname,email,web}
      for contacto in contactosSoloEmail
        tmpMemoriaDeContactosParaAgregar.push
          email: contacto

      for contacto in contactosConEmailYWeb
        RegExpResult   = contacto.match matchEmailAndWeb
        emailCapturado = RegExpResult[1] # Captura el email
        webCapturado   = RegExpResult[2] # Captura el Sito web

        tmpMemoriaDeContactosParaAgregar.push
          email : emailCapturado
          web   : webCapturado

      for contacto in contactosConNombreYEmail
        RegExpResult    = contacto.match matchEmailAndName
        nombreCapturado = RegExpResult[1]
        emailCapturado  = RegExpResult[2]

        # Divide el nombre del Apellido
        RegExpResultNameAndLastname = nombreCapturado.match matchNameAndLastName
        firstName = RegExpResultNameAndLastname[1]
        lastName  = RegExpResultNameAndLastname[2]


        tmpMemoriaDeContactosParaAgregar.push
          name  : firstName
          lastname : lastName
          email : emailCapturado

      for contacto in contactosConNombreEmailYWeb
        RegExpResult    = contacto.match matchEmailNameAndWeb
        nombreCapturado = RegExpResult[1]
        emailCapturado  = RegExpResult[2]
        webCapturado    = RegExpResult[3]

        # Divide el nombre del Apellido
        RegExpResultNameAndLastname = nombreCapturado.match matchNameAndLastName
        firstName = RegExpResultNameAndLastname[1]
        lastName  = RegExpResultNameAndLastname[2]


        tmpMemoriaDeContactosParaAgregar.push
          name  : firstName
          lastname : lastName
          email : emailCapturado
          web   : webCapturado


      logParseStringToEmailList.log "Memoria temporal previa a ingresar a la lista", tmpMemoriaDeContactosParaAgregar

      # Agregando todos los cantos a la lista final
      tmpMemoriaDeContactosParaAgregar = tmpMemoriaDeContactosParaAgregar.reverse()
      $scope.data.usersAdd = []

      for contacto in tmpMemoriaDeContactosParaAgregar
        $scope.data.usersAdd.push contacto

      # Cambiar a vista simple
      do $scope.toSingle



    # Evento para guardar los eventos en la base de datos
    save = ->
      dataNewUsers = $scope.data.usersAdd
      logSaveUsers.error 'Base para los usuarios a agregar', dataNewUsers



    $scope.bulkEmailToListAccounts = bulkEmailToListAccounts
    $scope.save                    = save
    $scope.d                       = dangerValidation
    $scope.v                       = successValidation
