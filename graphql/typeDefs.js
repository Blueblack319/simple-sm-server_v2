import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    createdAt: String!
    token: String!
  }
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
    comments: [Comment]!
    commentsCount: Int!
    likes: [Like]!
    likesCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    userName: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }
  input SignupInput {
    userName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Mutation {
    signup(signupInput: SignupInput): User!
    login(userName: String!, password: String!): User!
    createPost(userName: String, body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;

export default typeDefs;
