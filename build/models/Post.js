"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var postSchema = new _mongoose.Schema({
  body: String,
  userName: String,
  createdAt: String,
  comments: [{
    userName: String,
    body: String,
    createdAt: String
  }],
  likes: [{
    userName: String,
    createdAt: String
  }],
  commentsCount: Number,
  likesCount: Number,
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

var _default = (0, _mongoose.model)("Post", postSchema);

exports.default = _default;