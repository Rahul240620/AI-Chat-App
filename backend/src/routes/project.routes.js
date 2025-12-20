import { Router } from "express";
import { createProjectController } from "../controllers/project.controller.js";
import { body } from "express-validator";
import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authUserMiddleware,
  body("name").isString().withMessage("Name is required"),
  createProjectController
);

export default router;
