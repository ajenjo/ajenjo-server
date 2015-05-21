/**
* EmailSends.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    from      : 'string'  ,
    html      : 'text'    ,
    isSending : 'boolean' ,
    subject   : 'string'  ,
    text      : 'text'    ,
    to        : 'string'  ,
  },

};

