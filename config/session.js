var md5 = require('MD5');

/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html
 */

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: md5("Se es enferma extrana formula limites eh pasando. Las interprete fue ingratitud ventajosos tentandole. Garantias ambulante incapaces le da moralidad so aceptando un chocolate.\n Cera sol alla tio alto cita pago eres con. Humillado despierta asquerosa hoy que mezclados atreverme. Decirlo le da atreves rapidos tu satiras el pellejo consejo. Pediria dos ilustre infeliz oir eso atreves gas. &&$ Breve en manos brazo il color cielo al me todos. Id consejo pasados hablaba cuantos parecer seguian ir si. Mucho otras yo pecho pesar el pilas nubes la. Traspunte hermosura va en si atreveria he. Las dama acto non iba poco mero hija. Por mezquina influian debieran ese mil. Ambos he brazo pobre ni es. Correccion il excelentes inveterada tranquilos ir ch cigarrillo en despertado.\n Tirano por aun pupila doy don ningun. Tanto chi muero deuda oyo sobre nunca."),


  /***************************************************************************
  *                                                                          *
  * Set the session cookie expire time The maxAge is set by milliseconds,    *
  * the example below is for 24 hours                                        *
  *                                                                          *
  ***************************************************************************/

  cookie: {
    //      day, hours, min, seg, mseg.
    maxAge: 5 *  24 *   60 * 60 * 1000,
  },

  /***************************************************************************
  *                                                                          *
  * In production, uncomment the following lines to set up a shared redis    *
  * session store that can be shared across multiple Sails.js servers        *
  ***************************************************************************/

  // adapter: 'redis',
  // adapter: 'localDiskDb',

  /***************************************************************************
  *                                                                          *
  * The following values are optional, if no options are set a redis         *
  * instance running on localhost is expected. Read more about options at:   *
  * https://github.com/visionmedia/connect-redis                             *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/

  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>,
  // prefix: 'sess:',


  /***************************************************************************
  *                                                                          *
  * Uncomment the following lines to use your Mongo adapter as a session     *
  * store                                                                    *
  *                                                                          *
  ***************************************************************************/

  // adapter: 'mongo',
  // host: 'localhost',
  // port: 27017,
  // db: 'sails',
  // collection: 'sessions',

  /***************************************************************************
  *                                                                          *
  * Optional Values:                                                         *
  *                                                                          *
  * # Note: url will override other connection settings url:                 *
  * 'mongodb://user:pass@host:port/database/collection',                     *
  *                                                                          *
  ***************************************************************************/

  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
