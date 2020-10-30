"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _User = _interopRequireDefault(require("../../models/User"));

var _validateSignupInput = _interopRequireDefault(require("../../utils/validator/validateSignupInput"));

var _validateLoginInput = _interopRequireDefault(require("../../utils/validator/validateLoginInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var getToken = user => _jsonwebtoken.default.sign({
  id: user._id,
  userName: user.userName,
  email: user.email
}, process.env.SECRET_KEY, {
  expiresIn: "1h"
});

var userResolver = {
  Mutation: {
    login: function () {
      var _login = _asyncToGenerator(function* (_, _ref) {
        var {
          userName,
          password
        } = _ref;
        var {
          errors,
          validity
        } = (0, _validateLoginInput.default)(userName, password);

        if (!validity) {
          throw new _apolloServer.UserInputError("Errors", {
            errors
          });
        }

        var user = yield _User.default.findOne({
          userName
        });

        if (user) {
          var isMatched = _bcrypt.default.compare(password, user.password);

          if (isMatched) {
            var token = getToken(user);
            return _objectSpread(_objectSpread({
              id: user._id
            }, user._doc), {}, {
              token
            });
          } else {
            errors.password = "Password is wrong.";
            throw new _apolloServer.AuthenticationError("Password is wrong.", {
              errors
            });
          }
        } else {
          errors.general = "User is not exist";
          throw new _apolloServer.AuthenticationError("This user is not exist", {
            errors
          });
        }
      });

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    signup: function () {
      var _signup = _asyncToGenerator(function* (parent, _ref2, context, info) {
        var {
          signupInput: {
            userName,
            email,
            password,
            confirmPassword
          }
        } = _ref2;
        var {
          errors,
          validity
        } = (0, _validateSignupInput.default)(userName, email, password, confirmPassword); // Check input is valid

        if (!validity) {
          throw new _apolloServer.UserInputError("Errors", {
            errors
          });
        } // Check userName is already exist


        var user = yield _User.default.findOne({
          userName
        });

        if (user) {
          errors.general = "This user is already exist.";
          throw new _apolloServer.AuthenticationError("User is already exist.", {
            errors
          });
        } // Change password to hash


        password = yield _bcrypt.default.hash(password, 12);
        var newUser = new _User.default({
          userName,
          email,
          password,
          createdAt: new Date().toISOString()
        });
        var res = yield newUser.save(); // Get token

        var token = getToken(res);
        return _objectSpread(_objectSpread({
          id: res._id
        }, res._doc), {}, {
          // res를 destructuring 했을때랑 그냥 console.log로 출력했을 때랑 결과값 다름!
          token
        });
      });

      function signup(_x3, _x4, _x5, _x6) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }
};
var _default = userResolver;
exports.default = _default;