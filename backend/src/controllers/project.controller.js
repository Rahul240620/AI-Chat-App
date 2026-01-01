import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
import { ApiError } from "../services/ApiError.js";
import { validationResult } from "express-validator";
import {
  addUserToProjectService,
  createProjectService,
  getAllProjectService,
} from "../services/project.service.js";

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

// get all projects
const getAllProjectController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const allUserProjects = await getAllProjectService({ userId });
    return res.status(200).json({
      projects: allUserProjects,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
};

// add user to project
const addUserToProjectController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new ApiError(400, error.array()[0].msg);
  }
  try {
    const { projectId, users } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const project = await addUserToProjectService({ projectId, users, userId });
    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(400, error.message);
  }
};

export {
  createProjectController,
  getAllProjectController,
  addUserToProjectController,
};
