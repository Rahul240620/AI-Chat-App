import projectModel from "../models/project.model.js";
import { ApiError } from "../services/ApiError.js";
import mongoose from "mongoose";
// project creation service
const createProjectService = async (name, userId) => {
  if (!name) {
    throw new ApiError(400, "Project name is required");
  }

  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  let project;
  try {
    project = await projectModel.create({ name, users: [userId] });
  } catch (error) {
    if (error === 11000) {
      throw new ApiError("Project name must be unique");
    }
    throw error;
  }

  return project;
};

// getting all projects service
const getAllProjectService = async ({ userId }) => {
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  const allUserProjects = await projectModel.find({ users: userId });
  return allUserProjects;
};

// add user to project service
const addUserToProjectService = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }
  if (!users) {
    throw new ApiError(400, "Users are required");
  }
  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new ApiError(400, "Users must be an array");
  }
  if (!userId) {
    throw new ApiError(400, "User id is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id");
  }
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });
  if (!project) {
    throw new ApiError(400, "user not belong to project");
  }
  const updatedProject = await projectModel.findOneAndUpdate(
    { _id: projectId },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    { new: true }
  );
  return updatedProject;
};

// get project by id service
const getProjectByIdService = async ({ projectId }) => {
  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }
  const project = await projectModel.findOne({ _id: projectId }).populate(
    "users");
  if (!project) {
    throw new ApiError(400, "Project not found");
  }
  return project;
};


export { createProjectService, getAllProjectService, addUserToProjectService, getProjectByIdService };
