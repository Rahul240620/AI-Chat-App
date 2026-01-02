import { Router } from "express";
import {
  createUserController,
  userLoginController,
  userProfileController,
  userLogoutController,
  getAllUserController
} from "../controllers/user.controller.js ";
import { body } from "express-validator";

import { authUserMiddleware } from "../middleware/auth.middleware.js";

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

//user-login
router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password with min 4 letters required"),
  userLoginController
);

// user Profile
router.get("/profile", authUserMiddleware, userProfileController);

//user Logout
router.get("/logout", authUserMiddleware, userLogoutController);

// get all users
 router.get("/all-users", authUserMiddleware, getAllUserController);

export default router;
