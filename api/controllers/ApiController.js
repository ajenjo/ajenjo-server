/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var requestIp = require('request-ip');

module.exports = {

  /*****************************************************************************
  * LOGIN (URL: /api/login).                                                   *
  *                                                                            *
  * El controlador permite llevar a cabo el inicio de la sesión.               *
  *                                                                            *
  * STATUS:                                                                    *
  *   - 0   : Sin estado                                                       *
  *   - 1   : Estado del login ok, se ha iniciado correctamente.               *
  *   - 41  : Error de las credenciales, por lo que no pudo iniciar sesión.    *
  *   - 10  : Error del sistema, y no puede proceder con el inicio de sesión.  *
  *****************************************************************************/
  login: function (req, res, next) {

    var configMaxAgeSession = sails.config.session.cookie.maxAge;
    var password            = req.param('passwordVerific');
    var remember            = req.param('rememberAccount');
    var userOrEmail         = req.param('usernameOrEmail');
    var dataSession         = {};
    var dataUser            = {};

    // Modelo Data a retornar
    var dataReturn = {
      backServerCode : 0,
      loginCorrect   : false, // True or False
      loginError     : false, // True or False
      status         : 0, // 0, 1, 41, 10
      pathReturn     : sails.config.ajenjo.defaultPathReturnLogin,
    }

    var local = {
      status: {
        close: function () {
          res.json(dataReturn);
          req.generateEmitToAllRoomsSesion();
        },
        clear: function (codeIndex) {
          dataReturn.backServerCode = codeIndex;
          dataReturn.status = 0;
          local.status.close();
          req.generateEmitToAllRoomsSesion();
        },
        ok: function (codeIndex) {
          dataReturn.backServerCode = codeIndex;
          dataReturn.loginError = false;
          dataReturn.loginCorrect = true;
          dataReturn.pathReturn = req.session.returnPageTmp;
          dataReturn.status = 1;
          local.status.close();
          req.generateEmitToAllRoomsSesion();
        },
        errorLogin: function (codeIndex) {
          dataReturn.backServerCode = codeIndex;
          dataReturn.loginError = true;
          dataReturn.status = 41;
          local.status.close();
          req.generateEmitToAllRoomsSesion();
        },
        error: function (codeIndex) {
          dataReturn.backServerCode = codeIndex;
          dataReturn.loginError = true;
          dataReturn.status = 10;
          local.status.close();
          req.generateEmitToAllRoomsSesion();
        },
      }
    }

    if (userOrEmail && password) {
      // Busca el usuario
      User
        .findWithPassword({
          or : [
            { user  : userOrEmail },
            { email : userOrEmail },
          ],
          password: password,
        }, function (err, user) {
          if (err) {
            local.status.errorLogin(1);
          } else {
            req.sessiond.user = user;
            req.sessiond.memory.sesionactive = true;

            req.sessiond.$save(function(err, sesion) {
              if (err) {
                local.status.error(2);
              } else {
                local.status.ok(3);
              }
            });
          }
        });
    } else {
      local.status.error(4);
    };
  },

  logout: function (req, res, next) {

    req.sessiond.user = null;
    req.sessiond.memory.sesionactive = false;

    req.sessiond.$save(function(err, sesion){
      if (err) {
        res.json(500, {
          type: "error",
          message: "Is not Logout.",
        });
      } else {
        req.generateEmitToAllRoomsSesion();
        res.json({
          type: "ok",
          message: "Is Correcte Logout",
        });
      }
    });

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

  /*****************************************************************************
  * STATUS (URL: /api/status).                                                 *
  *                                                                            *
  * Muestra el status de la sesion.                                            *
  *                                                                            *
  *****************************************************************************/
  status: function (req, res, next) {
    req.generateStatus(function (returnData) {
      res.json(returnData);
    })
  },

};

