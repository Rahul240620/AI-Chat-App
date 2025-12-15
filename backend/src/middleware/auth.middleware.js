import jwt from "jsonwebtoken";
import { ApiError } from "../services/ApiError.js";

export const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Cannot found User");
    }
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized user");
  }
};
