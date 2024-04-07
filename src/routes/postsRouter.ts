import express from "express";
import {
  Create__POST__POST,
  Update__POST__PUT,
  Like__POST__PUT,
  Fetch__POST__GET,
  SET_POST_IMAGE__PUT,
  SET_POST_VIDEO__PUT,
  Delete__POST__DELETE,
} from "../controllers/Post-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const postRouter = express.Router();

postRouter.post(
  "/",
  [body("body").notEmpty().withMessage("Post body is required")],
  AuthenticateUser,
  Create__POST__POST
);

postRouter.put(
  "/",
  [body("body").notEmpty().withMessage("Body is required")],
  AuthenticateUser,
  Update__POST__PUT
);

postRouter.put("/:postId/like-post", AuthenticateUser, Like__POST__PUT);

postRouter.get("/:postId", AuthenticateUser, Fetch__POST__GET);

postRouter.put(
  "/set-image-url/:postId",
  [body("image").notEmpty().withMessage("image url is required")],
  AuthenticateUser,
  SET_POST_IMAGE__PUT
);

postRouter.put(
  "/set-video-url/:postId",
  [body("video").notEmpty().withMessage("image url is required")],
  AuthenticateUser,
  SET_POST_VIDEO__PUT
);

postRouter.delete("/:postId", AuthenticateUser, Delete__POST__DELETE);

export default postRouter;
