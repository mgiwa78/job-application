import express from "express";
import { Fetch_USER_FEED__GET } from "../controllers/Feed-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const feedRouter = express.Router();

feedRouter.get("/", AuthenticateUser, Fetch_USER_FEED__GET);

export default feedRouter;
