"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  createdAt: String
});

var _default = (0, _mongoose.model)("User", userSchema);

exports.default = _default;