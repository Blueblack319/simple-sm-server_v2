"use strict";

var _apolloServer = require("apollo-server");

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs.default,
  resolvers: _resolvers.default,
  context: (_ref) => {
    var {
      req
    } = _ref;
    return {
      req
    };
  }
});

_mongoose.default.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("\u2705Database is connected!");
  return server.listen({
    port: 4000
  });
}).then((_ref2) => {
  var {
    url
  } = _ref2;
  console.log("\u2705Server listening at ".concat(url));
}).catch(err => new Error(err));