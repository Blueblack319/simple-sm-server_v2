import { UserInputError } from "apollo-server";

import Post from "../../models/Post";
import checkAuth from "../../utils/check-auth";

const postResolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
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
    createPost: async (_, { body }, context) => {
      const { userName, id } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Body must not be empty.");
      }

      const newPost = new Post({
        body,
        userName,
        createdAt: new Date().toISOString(),
        user: id,
      });

      await newPost.save();
      return newPost;
    },
    deletePost: async (_, { postId }, context) => {
      const { userName } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (userName === post.userName) {
          await post.deleteOne();
          return "Post is deleted successfully.";
        } else {
          throw new Error("Action not allowed.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { userName } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.userName === userName)) {
            // already liked, unlike post
            post.likes = post.likes.filter(
              (like) => like.userName !== userName
            );
          } else {
            // unliked post, like post
            post.likes.push({
              // Q. id를 만들지 않았는데 자동으로 생성... 왜?? user의 id생성이랑 비교! (mongodb의 id 자동생성은 mongoose)
              userName,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default postResolver;
