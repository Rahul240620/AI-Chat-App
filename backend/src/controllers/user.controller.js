import userModel from "../models/user.model.js";
import { ApiError } from "../services/ApiError.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

//user register
const createUserController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ApiError(400, error.array()[0].msg);
  }
  try {
    const user = await createUser(req.body.email, req.body.password);
    const token = user.generateAuthToken();
    res.status(201).send(user, token);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// user login
const userLoginController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ApiError(400, error.array()[0].msg);
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid email or password");
    }
    const token = user.generateAuthToken();
    console.log({user, token});
    res.status(201).json({ user, token });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// User Profle
const userProfileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};

// user logout
const userLogoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    throw new ApiError(400, error.message);
  }
};

export {
  createUserController,
  userLoginController,
  userProfileController,
  userLogoutController,
};
