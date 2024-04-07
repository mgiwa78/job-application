import express from "express";
import { AuthenticateUser } from "../middleware/require-auth";
import { Fetch__NOTIFICATIONS__GET } from "../controllers/Notification-Controller";

const notificationsRouter = express.Router();

notificationsRouter.get("/", AuthenticateUser, Fetch__NOTIFICATIONS__GET);

export default notificationsRouter;
