/**
 * onlyDevelopers
 *
 * @module      :: Policy
 * @description :: Solo permite ver si esa la variable sails.config.environment
 *                 como Development.
 *
 */
module.exports = function (req, res, next){

  if (sails.config.environment != 'development') {
    return res.notFound();
  }

  return next();
};
