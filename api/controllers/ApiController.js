/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res, next) {

    var password    = req.param('passwordVerific');
    var remember    = req.param('rememberAccount');
    var userOrEmail = req.param('usernameOrEmail');



    // Return
    var dataReturn = {
      loginError: false,
      loginCorrect: false,
    }



    User
      .findWithPassword({
        or : [
          { user  : userOrEmail },
          { email : userOrEmail },
        ],
        password: password,
      }, function(err, user){
        if (err) {
          return res.badRequest();
        } else {

          // Si existe un usuario.
          if (user) {

            var isCorrectPassword = false;
            var isErrorLogin      = false;

            // Definicion de contraseña, compara la contraseña según la configuración de la cuenta.
            if (passwordService.verific(user.typePassword, password, user.password)) {
              isCorrectPassword = true;
            } else {
              isErrorLogin = true;
            };

            if (isErrorLogin) {
              dataReturn.loginError = true;
            };

            if (isCorrectPassword) {
              // Sesion completa, se crea la sesion.
              dataReturn.loginCorrect   = true;
              req.session.authenticated = true;
              req.session.user          = user;

            };

          } else {
            dataReturn.loginError = true;
          };

          res.json(dataReturn);
        };
      });
  },

  logout: function (req, res, next) {

    next();
  },

  recovery: function (req, res, next) {
    var emailToRecovery, userFound, returnMessage;
    emailToRecovery = req.param('email');


    returnMessage = {
      errorServer: false,
      isSendEmail: false,
    }


    /***************************************************************************
    * Buscando la cuenta asociada al correo elecntronico encontrado            *
    ***************************************************************************/
    User.findOne({
      email: emailToRecovery
    }).exec(function (err, user) {
      userFound = user;

      /* Si existe un error. */
      if (err) {
        returnMessage.errorServer = true;
      } else {

        returnMessage.debug = {
          emailToRecovery : emailToRecovery,
          err             : err,
          userFound       : userFound,
        };

        if (userFound) {
          /* Emviar Correo electronico. */

          /* Genera el codigo de verificacion y crea el cuerpo del correo*/
          (function(){
            /*******************************************************************
            * Crea un codigo de verificación para activar la cuenta.           *
            *******************************************************************/
            codigoDeVerificacion = (function(){
              prefijo = Number(new Date());

            }).call();
          }).call();

          returnMessage.isSendEmail = true;
        };

      };

      res.json(200, returnMessage);

    });
  },

};

