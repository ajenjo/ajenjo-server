// noIsLogin.js
/**
 *
 */

module.exports = function noIsLogin (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;


  res.status(200);

}
