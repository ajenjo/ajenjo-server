// ajenjoFrontTheme.js
/**
 * Ajenjo Configuractions
 * (sails.config.ajenjo)
 *
 * Mantiene la configuración de la aplicación para controlar la la aplicación.
 *
 *
 */

module.exports.ajenjo = {

  /*****************************************************************************
  * Rutas para el frontend.                                                    *
  *                                                                            *
  * Base para los documento asociados al frontend.                             *
  *                                                                            *
  * Con esta ruta es que la aplicación carga los documentos.                   *
  *****************************************************************************/

  frontRoute: 'C:/Users/Jonathan/Documents/RED.CLINIC(TM)/sessioncontrol_front',

  /*****************************************************************************
  * Control de cuentas. ¡En Desarrollo!                                        *
  *                                                                            *
  * Configurar si permite que la aplicación permita:                           *
  * - Registrar.                                                               *
  * - Iniciar Sesión.                                                          *
  * - Cerrar Sesión.                                                           *
  *****************************************************************************/

  /*****************************************************************************
  * De ser verdadero permite que el usairo restablesca su contraseña.          *
  *****************************************************************************/
  restartPassword: true,

  /*****************************************************************************
  * Define el valor del largo definido para crear un numero aleatorio, con el  *
  * que se generara una cadena MD5.                                            *
  *                                                                            *
  * NOTA: Ha mayor el largo mas demora codificación MD5.                       *
  *****************************************************************************/
  lengthToRandom: 15,

};
