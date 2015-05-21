/*******************************************************************************
* passwordService                                                              *
* (Service Password)                                                           *
*                                                                              *
* @module :: Service                                                           *
*******************************************************************************/
var
  md5,

  verific,
  verificLiteral,
  verificEncrypt,
  verificEncryptV2,

  generate,
  generateLiteral,
  generateEncrypt,
  generateEncryptV2;

md5 = require('MD5');

verific = function (type, password, hashPassword) {
  if (String(type).toLowerCase() === "literal") {
    return verificLiteral(password, hashPassword);
  };

  if (String(type).toLowerCase() === "encrypt") {
    return verificEncrypt(password, hashPassword);
  };

  if (String(type).toLowerCase() === "encryptv2") {
    return verificEncryptV2(password, hashPassword);
  };

  return false;
};

verificLiteral = function (password, hashPassword) {
  password     = String(password);
  hashPassword = String(hashPassword);
  return Boolean(generateLiteral(password) === hashPassword);
};

verificEncrypt = function (password, hashPassword) {
  password     = String(password);
  hashPassword = String(hashPassword);
  return Boolean(generateEncrypt(password) === hashPassword);
};

verificEncryptV2 = function (password, hashPassword) {
  hashPassword   = String(hashPassword);
  password       = String(password);

  return Boolean(generateEncryptV2(password) === hashPassword);
};

generate = function (type, password) {
  if (String(type).toLowerCase() === "literal") {
    return generateLiteral(password, hashPassword);
  };

  if (String(type).toLowerCase() === "encrypt") {
    return generateEncrypt(password, hashPassword);
  };

  if (String(type).toLowerCase() === "encryptv2") {
    return generateEncryptV2(password, hashPassword);
  };

  return false;
};

generateLiteral = function (password) {
  return password;
};
generateEncrypt = function (password) {
  return md5(password);
};
generateEncryptV2 = function (password) {
  var prefixPassword = sails.config.password.encryptV2.prefix || "000000000000000-";
  return md5(prefixPassword + password);
};

module.exports = {
  generate          : generate,
  generateEncrypt   : generateEncrypt,
  generateEncryptV2 : generateEncryptV2,
  generateLiteral   : generateLiteral,
  verific           : verific,
  verificEncrypt    : verificEncrypt,
  verificEncryptV2  : verificEncryptV2,
  verificLiteral    : verificLiteral,
}
