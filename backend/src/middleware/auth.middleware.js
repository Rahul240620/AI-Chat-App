import jwt from "jsonwebtoken";
import { ApiError } from "../services/ApiError.js";
import redisClient from "../services/redis.service.js";

export const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Cannot found User");
    }
    const isBlackListed = await redisClient.get(token);
    if (isBlackListed) {
      res.cookie("token", "");
      throw new ApiError(401, "Unauthorized user");
    }

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized user");
  }
};
