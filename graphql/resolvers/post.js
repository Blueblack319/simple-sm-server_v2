import Post from "../../models/Post";

const postResolver = {
  Query: {
    async getPosts() {
      const posts = Post.find();
      return posts;
    },
  },
  Mutation: {},
};

export default postResolver;
