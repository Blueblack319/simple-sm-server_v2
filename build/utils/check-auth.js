"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var checkAuth = context => {
  var authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer token
    var token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        var user = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);

        return user;
      } catch (err) {
        throw new _apolloServer.AuthenticationError("Invalid/Expired Token.");
      }
    } else {
      throw new _apolloServer.AuthenticationError("Authentication token must be 'Bearer [token].");
    }
  } else {
    throw new _apolloServer.AuthenticationError("Authorization header must be provided.");
  }
};

var _default = checkAuth;
exports.default = _default;