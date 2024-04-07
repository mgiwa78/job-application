import express from "express";
import {
  Fetch__USER_PROFILE__POST,
  SignIn__AUTH__POST,
  SignUp__AUTH__POST,
} from "../controllers/Auth-Controller";
import { AuthenticateUser } from "../middleware/require-auth";

import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";

const authRouter = express.Router();

authRouter.post("/signin", SignIn__AUTH__POST);
authRouter.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("userName").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("fullName").notEmpty().withMessage("Fullname is required"),
  ],
  ValidateRequest,
  SignUp__AUTH__POST
);

authRouter.get("/me", AuthenticateUser, Fetch__USER_PROFILE__POST);

export default authRouter;
