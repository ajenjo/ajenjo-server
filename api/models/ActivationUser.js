/**
* ActivationUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var numMultiple, numEndSum, fnGenNumberWithLength, md5, generateMD5TextRandom;

md5 = require('MD5');

fnGenNumberWithLength = function(length, strFirstNumber, otherNumber){
  strLengthNumber = '';
  for (var i = 0; i < length; i++) {
    if (i === 0) {
      strLengthNumber = strLengthNumber + String(strFirstNumber);
    } else {
      strLengthNumber = strLengthNumber + String(otherNumber);
    }
  };
  return Number(strLengthNumber);
};

numMultiple = fnGenNumberWithLength(sails.config.ajenjo.lengthToRandom, 8, 9);
numEndSum   = fnGenNumberWithLength(sails.config.ajenjo.lengthToRandom, 1, 0);

generateMD5TextRandom = function () {
  return md5(
    (
      (
        Math.random() * numMultiple
      ) + numEndSum
    ).toFixed(0)
  );
};


module.exports = {

  attributes: {

    type: {
      type: 'string',
      enum: [
        'activate',
        'disable',
        'recovery',
      ],
      required: true,
    },

    code: {
      required: true,
      type: 'string',
    },

    user: {
      model: 'user',
    },

  },

  generateCode: generateMD5TextRandom,

  generateAnActivation: function (opts, cb) {
    var
      userSelected,
      callback,
      md5CodeValidation,
      crearUnNuevoActivador;

    if (cb)
      callback = cb;
    if (opts.type)
      typeActivity = opts.type;
    if (opts.user)
      userSelected = opts.user;

    md5CodeValidation = (generateMD5TextRandom).call(null);

    if (!typeActivity) {
      if (callback) {
        callback({
          message: "Require el tipo de actividad",
        });
      }
    } else {
      ActivationUser.create({
        type: typeActivity,
        code: md5CodeValidation,
        user: userSelected,
      }).exec(callback);
    }

  },

};

