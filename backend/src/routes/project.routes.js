import { Router } from "express";
import { createProjectController, getAllProjectController } from "../controllers/project.controller.js";
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


export default router;
