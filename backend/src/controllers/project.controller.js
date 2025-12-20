import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
import { ApiError } from "../services/ApiError.js";
import { validationResult } from "express-validator";
import { createProjectService } from "../services/project.service.js";

// project creation controller
const createProjectController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ApiError(400, error.array()[0].msg);
  }
  try {
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const newproject = await createProjectService(name, userId);
    res.status(201).json(newproject);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
};

export { createProjectController };
