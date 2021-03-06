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

  key: "ajenjo.session",

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: md5(process.env.session_secret || 'abc...'),


  /***************************************************************************
  *                                                                          *
  * Set the session cookie expire time The maxAge is set by milliseconds,    *
  * the example below is for 24 hours                                        *
  *                                                                          *
  ***************************************************************************/

  cookie: {
    maxAge: (function(){
      var dateEnd = new Date(
        process.env.session_maxage_years        || 0,
        process.env.session_maxage_months       || 1,
        process.env.session_maxage_days         || 0,
        process.env.session_maxage_hours        || 0,
        process.env.session_maxage_seconds      || 0,
        process.env.session_maxage_minutes      || 0,
        process.env.session_maxage_milliseconds || 0);

      return Number(Number(dateEnd) - Number(new Date(0,0,0,0)));
    }).call(),

    maxAgeNoSession: (function() {
      var dateEnd = new Date(
        process.env.session_maxage_nosession_years        || 0,
        process.env.session_maxage_nosession_months       || 0,
        process.env.session_maxage_nosession_days         || 0,
        process.env.session_maxage_nosession_hours        || 2,
        process.env.session_maxage_nosession_seconds      || 0,
        process.env.session_maxage_nosession_minutes      || 0,
        process.env.session_maxage_nosession_milliseconds || 0);

      return Number(Number(dateEnd) - Number(new Date(0,0,0,0)));
    }).call(),
  },

  /***************************************************************************
  *                                                                          *
  * In production, uncomment the following lines to set up a shared redis    *
  * session store that can be shared across multiple Sails.js servers        *
  *                                                                          *
  ***************************************************************************/

  // adapter: 'redis',
  // adapter: 'memory',

  /***************************************************************************
  *                                                                          *
  * The following values are optional, if no options are set a redis         *
  * instance running on localhost is expected. Read more about options at:   *
  * https://github.com/visionmedia/connect-redis                             *
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
