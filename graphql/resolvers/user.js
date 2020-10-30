import { AuthenticationError, UserInputError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../../models/User";
import validateSignupInput from "../../utils/validator/validateSignupInput";
import validateLoginInput from "../../utils/validator/validateLoginInput";

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
    login: async (_, { userName, password }) => {
      const { errors, validity } = validateLoginInput(userName, password);
      if (!validity) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const user = await User.findOne({ userName });
      if (user) {
        const isMatched = bcrypt.compare(password, user.password);
        if (isMatched) {
          const token = getToken(user);
          return {
            id: user._id,
            ...user._doc,
            token,
          };
        } else {
          errors.password = "Password is wrong.";
          throw new AuthenticationError("Password is wrong.", { errors });
        }
      } else {
        errors.general = "User is not exist";
        throw new AuthenticationError("This user is not exist", { errors });
      }
    },
    signup: async (
      parent,
      { signupInput: { userName, email, password, confirmPassword } },
      context,
      info
    ) => {
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
        id: res._id, // Q. like 객체의 id는 자동으로 생성되었는데 여기 id는 왜 따로 만들어줘야 하지??
        ...res._doc, // res를 destructuring 했을때랑 그냥 console.log로 출력했을 때랑 결과값 다름!
        token,
      };
    },
  },
};

export default userResolver;
