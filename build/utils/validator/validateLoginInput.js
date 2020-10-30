"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validateLoginInput = (userName, password) => {
  var errors = {};

  if (userName.trim() === "") {
    errors.userName = "User name must not be empty.";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    validity: Object.keys(errors).length < 1
  };
};

var _default = validateLoginInput;
exports.default = _default;