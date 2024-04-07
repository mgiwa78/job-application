import express from "express";
import {
  Update__COMMENT__PUT,
  Create__COMMENT__POST,
  Like__COMMENT__PUT,
  Fetch__COMMENTS__GET,
  Fetch__COMMENT__GET,
  Delete__COMMENT__DELETE,
} from "../controllers/Comment-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const commentRouter = express.Router();

commentRouter.get("/:postId", AuthenticateUser, Fetch__COMMENTS__GET);

commentRouter.post(
  "/:postId",
  [body("body").notEmpty().withMessage("Comment body is required")],
  AuthenticateUser,
  Create__COMMENT__POST
);

commentRouter.put(
  "/",
  [body("body").notEmpty().withMessage("Comment body is required")],
  AuthenticateUser,
  Update__COMMENT__PUT
);
commentRouter.get("/:commentId", AuthenticateUser, Fetch__COMMENT__GET);

commentRouter.delete("/:commentId", AuthenticateUser, Delete__COMMENT__DELETE);

commentRouter.put(
  "/:commentId/like-comment",
  AuthenticateUser,
  Like__COMMENT__PUT
);

export default commentRouter;
