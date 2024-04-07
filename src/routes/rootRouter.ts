import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";
import postRouter from "./postsRouter";
import commentRouter from "./commentsRouter";
import feedRouter from "./feedRouter";
import notificationsRouter from "./notificationsRouter";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Social Media API is online and running");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/feed", feedRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/posts", postRouter);
rootRouter.use("/notifications", notificationsRouter);

export default rootRouter;
