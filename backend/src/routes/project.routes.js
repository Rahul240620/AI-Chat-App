import { Router } from "express";
import {
  createProjectController,
  getAllProjectController,
  addUserToProjectController,
  getProjectByIdController 
} from "../controllers/project.controller.js";
import { body } from "express-validator";
import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

//creates project
router.post(
  "/create",
  authUserMiddleware,
  body("name").isString().withMessage("Name is required"),
  createProjectController
);

// get all projects
router.get("/all", authUserMiddleware, getAllProjectController);

// add user to project
router.put(
  "/add-user",
  authUserMiddleware,
  body("projectId").isString().withMessage("Project id is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array").bail()
    .custom((users) => users.every(user => typeof user === "string"))
    .withMessage("Users must be an array of strings"),
  addUserToProjectController
);


// get project by id
router.get ('/get-project/:projectId', authUserMiddleware, getProjectByIdController)

export default router;
