import userModel from "../models/user.model";
import { ApiError } from "./ApiError";
const createUser = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const hasedPassword = await userModel.hashPassword(password);
  const user = await userModel.create({ email, password: hasedPassword });
  return user;
};

export { createUser };
