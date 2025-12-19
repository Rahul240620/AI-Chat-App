import projectModel from "../models/project.model.js";
import { ApiError } from "../services/ApiError.js";

const createProjectService = async (name, userId) => {
  if (!name) {
    throw new ApiError(400, "Project name is required");
  }

  if (!userId) {
    throw new ApiError(400, "User id is required");
  }

  const project = await project.create({ name, users: [userId] });
  return project;
};
