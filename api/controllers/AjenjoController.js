/**
 * AjenjoController
 *
 * @description :: Server-side logic for managing ajenjoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


	index: function (req, res, next) {
    res.view('home');
    // res.sendfile(sails.config.ajenjo.frontRoute + '/dest/home.html', null);
  },


};

