import userModel from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

// create user service
const createUser = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const hasedPassword = await userModel.hashPassword(password);
  const user = await userModel.create({ email, password: hasedPassword });
  return user;
};

// get all user service
const getAllUserService = async ({userId}) => {
  const users = await userModel.find({ _id: { $ne: userId } });
  return users;
};

export { createUser, getAllUserService };
