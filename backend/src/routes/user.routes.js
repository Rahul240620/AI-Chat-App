import { Router } from "express";
import { createUserService } from "../services/user.service";
import { body } from "express-validator";

const router = Router();
router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be between 4 and 20 characters"),
  createUserService
);

export default router;
