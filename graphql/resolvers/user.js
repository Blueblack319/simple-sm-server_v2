import { AuthenticationError, UserInputError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../../models/User";
import validateSignupInput from "../../utils/validator/validateSignupInput";

dotenv.config();

const getToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

const userResolver = {
  Mutation: {
    async signup(
      parent,
      { signupInput: { userName, email, password, confirmPassword } },
      context,
      info
    ) {
      const { errors, validity } = validateSignupInput(
        userName,
        email,
        password,
        confirmPassword
      );
      // Check input is valid
      if (!validity) {
        throw new UserInputError("Errors", { errors });
      }

      // Check userName is already exist
      const user = await User.findOne({ userName });
      if (user) {
        errors.general = "This user is already exist.";
        throw new AuthenticationError("User is already exist.", {
          errors,
        });
      }

      // Change password to hash
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      // Get token
      const token = getToken(res);
      return {
        id: res._id,
        ...res._doc, // res를 destructuring 했을때랑 그냥 console.log로 출력했을 때랑 결과값 다름!
        token,
      };
    },
    async login(_, { userName, password }) {},
  },
};

export default userResolver;
