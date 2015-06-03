/*
* 204 Login Failed.
*/

module.exports = function (data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  res.status(204);

  res.json(data);

};
