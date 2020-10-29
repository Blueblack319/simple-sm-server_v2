import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`✅Server listening at ${url}`);
});
