import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticationError } from "apollo-server";

dotenv.config();

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token.");
      }
    } else {
      throw new AuthenticationError(
        "Authentication token must be 'Bearer [token]."
      );
    }
  } else {
    throw new AuthenticationError("Authorization header must be provided.");
  }
};

export default checkAuth;
