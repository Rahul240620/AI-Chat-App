import userModel from "../models/user.model";
``;
import { ApiError } from "../services/ApiError";
import { createUser } from "../services/user.service";
import { validationResult } from "express-validator";

const createUserService = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ApiError(400, error.array());
  }
  try {
    const user = await createUser(req.body.email, req.body.password);
    const token=user.generateAuthToken();
    res.status(201).send(user, token);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}; 
