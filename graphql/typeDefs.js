import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    password: String!
    createdAt: String!
    token: String!
  }
  type Post {
    id: ID!
    userName: String!
    createdAt: String!
    comments: [Comment]!
    commentsCount: Int!
    likes: [Like]!
    likesCount: Int!
    token: String!
  }
  type Comment {
    id: ID!
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
    getPost: Post!
  }
`;

export default typeDefs;
