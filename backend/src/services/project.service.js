import projectModel from "../models/project.model.js";
import { ApiError } from "../services/ApiError.js";

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

export { createProjectService };
