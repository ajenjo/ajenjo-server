/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
// var md5   = require('MD5');
var cookie = require("cookie");

module.exports = {

  index: function (req, res, next) {
    res.view('login');
    // res.sendfile(sails.config.ajenjo.frontRoute + '/dest/login.html', null);
  },

  r: function (req, res, next) {

    var cookieDect
      , sessionSender
      , returnPage;

    /***************************************************************************
    * Busca Si existe la variable de sesion definida.                          *
    ***************************************************************************/
    if (req.param('s') && req.param('r')) {
      returnPage    = req.param('r');
      sessionSender = req.param('s');

      req.session.returnPageTmp = returnPage;

      /*Get Session Index*/
      sessionIDcapture = sessionSender;

      if (sessionIDcapture) {
        req.sessiondAnido(sessionIDcapture, function(err, sn){
          res.redirect("/login");
        });
      } else {
        res.notFound();
      }
    } else {
      res.notFound();
    }

  },

};

