/*******************************************************************************
* Maneja El Flujo De La Sesiones Y Sus Memorias.                               *
*******************************************************************************/

module.exports = function(idSessionUnique, cb) {
  var modelSession;

  Sessions
    .findOne({sessions:[idSessionUnique]})
    .exec(cb);

  // return "saludos des de el control de sesion";

};
