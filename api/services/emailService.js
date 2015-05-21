/*******************************************************************************
* emailService                                                                 *
* (Service Email)                                                              *
*                                                                              *
* @module :: Service                                                           *
*                                                                              *
* Permite Enviar correo Electrónicos, y almacena el envió del correo a los en  *
* la base de datos.                                                            *
*                                                                              *
*******************************************************************************/
module.exports = (function(){
  /* Definición de variables */
  var
    mailgun,
    emailService,
    api_key,
    boxMailgun,
    domain;


  var mailgun = require('mailgun-js');


  /*****************************************************************************
  * Variables y configuraciones.                                               *
  * Configuraciones de servicio de correo.                                     *
  *****************************************************************************/
  api_key = "key-c7a1511bda0770fa6751d992df81bc52";
  domain  = "sandbox9d964d5d0eaf4cb7a898225ba82e92a6.mailgun.org";


  /*****************************************************************************
  * Genera objeto casilla de correos mailgun.                                  *
  *****************************************************************************/
  boxMailgun = new mailgun({
    apiKey: api_key,
    domain: domain,
  });


  // sails.log("El box es", boxMailgun);

  emailService = {};


  /*****************************************************************************
  * Permite enviar un correo electrónico, enviando lo a la casilla saliente    *
  * del sistema de correos y almacenando el mensaje en la base de datos.       *
  *                                                                            *
  * Estructura de datos (`data`):                                              *
  *                                                                            *
  * data:                                                                      *
  *     - from    : Correo electrónico que envía el correo.                    *
  *     - to      : Cuentas del destinatario.                                  *
  *     - subject : Titulo del correo.                                         *
  *     - text    : Texto plano del correo.                                    *
  *     - html    : Cuerpo html del correo.                                    *
  *****************************************************************************/
  emailService.sendEmail = function (data, callback) {

    /* to DB */
    EmailSends.create(data).exec(function(err,emailData){
      if (err) {
        sails.log.error('No se pudo cargar el nuevo correo.');
      } else {

        /* boxMailGun */
        boxMailgun.messages().send(emailData, function (err, dataEmailSend){

          /* Si existe error. */
          if (err) {
            emailData.isSending = false
          } else {
            emailData.isSending = true
          }

          /* Guardar data del email verificando si se envió o no el correo */
          emailData.save(function(err){});

          callback(err, dataEmailSend);

        });

      }
    });

  };

  emailService.test = function () {
    emailService.sendEmail({
      from: 'soporte@ajenjo.jon.soy',
      to: 'hi@jon.soy',
      subject: 'Mensaje de prueba',
      text: 'El texto literal esta aquí.',
      html: 'El <u>texto</u> en <s>html</s> esta <strong>aquí</strong>.',
    },sails.log.debug);
  }

  emailService.defaultBox = boxMailgun;

  return emailService;
}).call();
