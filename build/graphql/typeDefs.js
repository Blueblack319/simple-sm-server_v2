"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type User {\n    id: ID!\n    userName: String!\n    email: String!\n    password: String!\n    createdAt: String!\n    token: String!\n  }\n  type Post {\n    id: ID!\n    body: String!\n    userName: String!\n    createdAt: String!\n    comments: [Comment]!\n    commentsCount: Int!\n    likes: [Like]!\n    likesCount: Int!\n  }\n  type Comment {\n    id: ID!\n    body: String!\n    userName: String!\n    createdAt: String!\n  }\n  type Like {\n    id: ID!\n    userName: String!\n    createdAt: String!\n  }\n  type Query {\n    getPosts: [Post]!\n    getPost(postId: ID!): Post!\n  }\n  input SignupInput {\n    userName: String!\n    email: String!\n    password: String!\n    confirmPassword: String!\n  }\n  type Mutation {\n    signup(signupInput: SignupInput): User!\n    login(userName: String!, password: String!): User!\n    createPost(token: String, body: String!): Post!\n    deletePost(postId: ID!): String!\n    likePost(postId: ID!): Post!\n    createComment(postId: ID!, body: String!): Post!\n    deleteComment(postId: ID!, commentId: ID!): Post!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
var _default = typeDefs;
exports.default = _default;