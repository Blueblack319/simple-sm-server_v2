import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  createdAt: String,
});

export default model("User", userSchema);
