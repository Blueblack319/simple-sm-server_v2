import postResolver from "./post";
import userResolver from "./user";

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

export default resolvers;
