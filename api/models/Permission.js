/**
* Permission.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: "string",
      unique: true,
    },

    description: {
      type: 'string',
    },

    groups: {
      collection: 'group',
      via: 'permissions',
    },

    users: {
      collection: 'user',
      via: 'permissions',
    },

  }, // End Attributes

};

