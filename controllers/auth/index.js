const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const updateBalance = require("./updateBalance");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  googleAuth,
  googleRedirect,
  updateBalance,
};
