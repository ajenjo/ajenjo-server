/**
* Sessions.js
*
* @description :: El modelo define las sesiones que se encuentran asociados a
*                 los distintos usuarios.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    id: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true,
    },

    sessions: "string",

    browser: "string",

    ip: "string",

    status: {
      defaultsTo: true,
      type: 'boolean',
    },

    /***************************************************************************
    * Contiene la fecha en la que se expirara la session.                      *
    ***************************************************************************/
    expire: "datetime",

    user: {
      model: 'user',
    },

    memory: {
      type: "json",
    },

  }, // End Attributes

  /*
  * Busca o Crea una Nueva Sesion.
  */
  getAsession: function (idSession, cb) {
    Sessions.findOne({
      'sessions': {
          like: '%' + idSession + '%'
      }
    }).populate('user').sort({id: "DESC"}).exec(function(err, sn){
      sn = sn || {};
      sn.memory = sn.memory || {};

      sn.$save = function (cb) {
        if (sn.save) {
          sn.save(cb);
        } else {
          Sessions.create(sn).exec(cb);
        }
      };

      cb(err, sn);
    });
  },

  /*
  * Crea una nueva sesión en la base de datos, por lo que la variable config,
  * debe de tener el browser, ip y otros detalles.
  */
  createASession: function (config, cb) {
    var modelSession, callback;

    callback = cb || function () {};
    modelSession = {};

    if (config.user) {
      modelSession.user = config.user
    };

    if (config.browser) {
      modelSession.browser = config.browser;
    };

    if (config.ip) {
      modelSession.ip = config.ip;
    };

    if (config.status) {
      modelSession.status = config.status;
    };

    if (config.sessionid) {
      modelSession.sessionid = config.sessionid;
      modelSession.sessions.push(config.sessionid);
    };

    if (config.expire && config.expire === true) {
      var dataExpire = new Date(Number(new Date()) + sails.config.session.cookie.maxAge).toISOString();
      modelSession.expire = dataExpire;
    } else {
      var dataExpire = new Date(Number(new Date()) + sails.config.session.cookie.maxAgeNoSession).toISOString();
      modelSession.expire = dataExpire;
    };

    // Almacena el modelo de la sesión.
    Sessions.create(modelSession).exec(cb);

    /*
    * Retorna el modelo de la data para la sesion.
    */
    return modelSession;
  },

};

