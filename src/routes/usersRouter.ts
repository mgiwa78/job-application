import express from "express";
import {
  Update__USER__PUT,
  Fetch__PROFILE__GET,
  Follow__USER__PUT,
} from "../controllers/User-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const router = express.Router();

router.get("/my-profile", AuthenticateUser, Fetch__PROFILE__GET);
router.put("/follow-user", AuthenticateUser, Follow__USER__PUT);
router.put("/", AuthenticateUser, Update__USER__PUT);

export default router;
