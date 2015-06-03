/**
 * Password Configuretion Service
 */

module.exports.password = {

  literal: {

  },

  encrypt: {

  },

  encryptV2: {
    /***************************************************************************
    * Define el prefijo con que la contraseña codifica su hash.                *
    ***************************************************************************/
    prefix: process.env.password_v2_prefix || '000-'
  },
}
