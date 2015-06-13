/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

var base32 = require('thirty-two');
var sessionsMultiAccess = require('../api/component/sessionsMultiAccess.js');

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  "*": [sessionsMultiAccess.setupSessionConfig, sessionsMultiAccess.forsetGetSessionData],

  '/': 'AjenjoController',
  '/test': function (req, res, next){
    // sails.log(req.sessiond);

    res.json({
      "req.sessionID" : req.sessionID,
      "req.session"   : req.session,
      "req.sessiond"  : req.sessiond,
      "req.datad"     : req.datad,
    });
  },

  '/two': function (req, res, next) {
    var base32 = require('thirty-two');
    var qr = require('qr-image');

    /*
    * Meustra el codigo para el token. que se puede usar dentro de la aplicacion
    * de google 2 autentificacion.
    */

    var key = 'abc';

    // encoded will be the secret key, base32 encoded
    var encoded = base32.encode(key);

    // Google authenticator doesn't like equal signs
    var encodedForGoogle = encoded.toString().replace(/=/g,'');

    // to create a URI for a qr code (change totp to hotp if using hotp)
    var uri = 'otpauth://totp/Ajenjo2test?secret=' + encodedForGoogle;

    var qr_svg = qr.imageSync(uri, { type: 'svg' });

    var htmlBody = "<p>Codigo del token: "+encodedForGoogle+"</p><p> URI to QR: "+uri+"</p><div style=\"max-width: 500px;\">"+qr_svg+"</div>";

    res.send(htmlBody);
    // res.send(uri);
  },

  '/two2': function (req, res, next) {
    var notp = require('notp');

    //.... some initial login code, that receives the user details and TOTP / HOTP token

    var key = 'abc';
    var token = req.query.toke;

    // Check TOTP is correct (HOTP if hotp pass type)
    var login = notp.totp.verify(token, key);

    // invalid token if login is null
    if (!login) {
        return res.send('Token:' + token + '; Token invalid');
    }

    // valid token
    return res.send('Token:' + token + '; Token valid, sync value is' + login.delta);
  },

  '/login': true,

  // '/test/activate': function () {
  //   User.find()
  // },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
