/*******************************************************************************
* ViewSessionActive *
* *
* Controla si la sesión actual puede seguir activa o no.
*
* Esta política define si la fecha de expiación de la sesión sigue vigente.
* según `req.session.expire`.
*
* @module :: Policy
*******************************************************************************/
module.exports = function (req, res, next) {

  // sails.log("a Policies ViewSessionActive");

  return next();

};
