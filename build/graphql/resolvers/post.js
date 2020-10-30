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

var postResolver = {
  Query: {
    getPosts: function () {
      var _getPosts = _asyncToGenerator(function* () {
        try {
          var posts = yield _Post.default.find().sort({
            createdAt: -1
          });
          return posts;
        } catch (err) {
          throw new Error(err);
        }
      });

      function getPosts() {
        return _getPosts.apply(this, arguments);
      }

      return getPosts;
    }(),
    getPost: function () {
      var _getPost = _asyncToGenerator(function* (_, _ref) {
        var {
          postId
        } = _ref;

        try {
          var regEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

          if (postId.match(regEx)) {
            var post = yield _Post.default.findById(postId);

            if (post) {
              return post;
            } else {
              throw new Error("Post not found.");
            }
          } else {
            throw new Error("Post not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      });

      function getPost(_x, _x2) {
        return _getPost.apply(this, arguments);
      }

      return getPost;
    }()
  },
  Mutation: {
    createPost: function () {
      var _createPost = _asyncToGenerator(function* (_, _ref2, context) {
        var {
          body
        } = _ref2;
        var {
          userName,
          id
        } = (0, _checkAuth.default)(context);

        if (body.trim() === "") {
          throw new _apolloServer.UserInputError("Body must not be empty.");
        }

        var newPost = new _Post.default({
          body,
          userName,
          createdAt: new Date().toISOString(),
          user: id
        });
        yield newPost.save();
        return newPost;
      });

      function createPost(_x3, _x4, _x5) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }(),
    deletePost: function () {
      var _deletePost = _asyncToGenerator(function* (_, _ref3, context) {
        var {
          postId
        } = _ref3;
        var {
          userName
        } = (0, _checkAuth.default)(context);

        try {
          var post = yield _Post.default.findById(postId);

          if (userName === post.userName) {
            yield post.deleteOne();
            return "Post is deleted successfully.";
          } else {
            throw new Error("Action not allowed.");
          }
        } catch (err) {
          throw new Error(err);
        }
      });

      function deletePost(_x6, _x7, _x8) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }(),
    likePost: function () {
      var _likePost = _asyncToGenerator(function* (_, _ref4, context) {
        var {
          postId
        } = _ref4;
        var {
          userName
        } = (0, _checkAuth.default)(context);

        try {
          var post = yield _Post.default.findById(postId);

          if (post) {
            if (post.likes.find(like => like.userName === userName)) {
              // already liked, unlike post
              post.likes = post.likes.filter(like => like.userName !== userName);
            } else {
              // unliked post, like post
              post.likes.push({
                // Q. id를 만들지 않았는데 자동으로 생성... 왜?? user의 id생성이랑 비교! (mongodb의 id 자동생성은 mongoose)
                userName,
                createdAt: new Date().toISOString()
              });
            }

            yield post.save();
            return post;
          } else {
            throw new _apolloServer.UserInputError("Post not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      });

      function likePost(_x9, _x10, _x11) {
        return _likePost.apply(this, arguments);
      }

      return likePost;
    }()
  }
};
var _default = postResolver;
exports.default = _default;