/**
* Sessions.js
*
* @description :: El modelo define las sesiones que se encuentran asociados a
*                 los distintos usuarios.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    browser: {
      type: 'string',
    },

    state: {
      defaultTo: false,
      type: 'boolean',
    },

    user: {
      model: 'user',
    },

  }, // End Attributes

};

