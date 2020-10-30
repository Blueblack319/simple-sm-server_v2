"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _Post = _interopRequireDefault(require("../../models/Post"));

var _checkAuth = _interopRequireDefault(require("../../utils/check-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var commentResolver = {
  Mutation: {
    createComment: function () {
      var _createComment = _asyncToGenerator(function* (_, _ref, context) {
        var {
          postId,
          body
        } = _ref;
        var {
          userName
        } = (0, _checkAuth.default)(context);

        if (body.trim() === "") {
          throw new _apolloServer.UserInputError("Body must not be empty.");
        }

        var post = yield _Post.default.findById(postId);

        if (post) {
          post.comments.unshift({
            body,
            userName,
            createdAt: new Date().toISOString()
          });
          yield post.save();
          return post;
        } else {
          throw new Error("Post not found.");
        }
      });

      function createComment(_x, _x2, _x3) {
        return _createComment.apply(this, arguments);
      }

      return createComment;
    }(),
    deleteComment: function () {
      var _deleteComment = _asyncToGenerator(function* (_, _ref2, context) {
        var {
          postId,
          commentId
        } = _ref2;
        var {
          userName
        } = (0, _checkAuth.default)(context);
        var post = yield _Post.default.findById(postId);

        if (post) {
          var commentIndex = post.comments.findIndex(comment => comment.id === commentId);

          if (post.comments[commentIndex].userName === userName) {
            post.comments.slice(commentIndex, 1);
            yield post.save();
            return post;
          } else {
            throw new _apolloServer.AuthenticationError("Action not allowed.");
          }
        } else {
          throw new _apolloServer.UserInputError("Post not found.");
        }
      });

      function deleteComment(_x4, _x5, _x6) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }
};
var _default = commentResolver;
exports.default = _default;