import { model, Schema } from "mongoose";

const postSchema = new Schema({
  body: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      userName: String,
      body: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  commentsCount: Number,
  likesCount: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("Post", postSchema);
