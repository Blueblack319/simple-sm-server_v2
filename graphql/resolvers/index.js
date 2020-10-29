import userResolver from "./user";

const resolvers = {
  Query: {},
  Mutation: {
    ...userResolver.Mutation,
  },
};

export default resolvers;
