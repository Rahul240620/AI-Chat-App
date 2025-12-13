import { Router } from "express";
import {
  createUserController,
  userLoginController,
} from "../controllers/user.controller.js ";
import { body } from "express-validator";

const router = Router();
// user-register
router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be between 4 and 20 characters"),
  createUserController
);

//user -login
router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password with min 4 letters required"),
  userLoginController
);

export default router;
