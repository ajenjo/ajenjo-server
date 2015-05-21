/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var md5   = require('MD5');


module.exports = {

  index: function (req, res, next) {
    res.sendfile(sails.config.ajenjo.frontRoute + '/dest/login.html', null);
  },

  "*": function (req, res, next) {

    searchURL = /\/login\/(.+)$/ig.exec(req.url)

    if (searchURL[1]) {
      req.session.rq = searchURL[1];
      res.redirect('/login');
    } else {
      res.notFound();
    }

    // res.json({url:req.url,session: req.session});

  },

};

