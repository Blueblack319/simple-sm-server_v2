import Post from "../../models/Post";

const postResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const regEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
        if (postId.match(regEx)) {
          const post = await Post.findById(postId);
          if (post) {
            return post;
          } else {
            throw new Error("Post not found.");
          }
        } else {
          throw new Error("Post not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost() {},
    async deletePost() {},
    async likePost() {},
  },
};

export default postResolver;
