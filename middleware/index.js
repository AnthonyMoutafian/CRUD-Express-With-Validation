const { ageValidation } = require("./ageValidation");
const { createPath } = require("./createPath");
const { emailValidation } = require("./emailValidation");
const { nameFix } = require("./nameFix");
const { passwordValidation } = require("./passwordValidation");
const { readFile } = require("./readFile");

module.exports = {
  createPath,
  readFile,
  nameFix,
  ageValidation,
  emailValidation,
  passwordValidation
};
