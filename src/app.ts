import express from "express";
import bodyParser, { json } from "body-parser";

import "express-async-errors";
import cors from "cors";
import rootRouter from "./routes/rootRouter";
import { errorHandler } from "./middleware/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import { Socket } from "socket.io";
import { TPostDoc } from "./models/post";

const http = require("http");
const socketIo = require("socket.io");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(json());

app.use(rootRouter);

export function notifyNewFollower(
  followedUserId: string,
  followerName: string
) {
  const notification = {
    type: "newFollower",
    message: `You have a new follower: ${followerName}`,
  };
  sendPushNotificationToUser(followedUserId, notification);
}

// New comment on the user's post notification

// New like on the user's post notification
export function notifyNewLike(postCreatorId: string, likerName: string) {
  const notification = {
    type: "newLike",
    message: `${likerName} liked your post`,
  };
  sendPushNotificationToUser(postCreatorId, notification);
}

// New post by followed user notification
export function notifyNewPostByFollowedUser(userId: string, post: TPostDoc) {
  const notification = {
    type: "newPostByFollowedUser",
    message: `New post by ${post.author}: ${post.body}`,
  };
  sendPushNotificationToUser(userId, notification);
}

const server = http.createServer(app);
const io = socketIo(server);
const connectedUsers: any = {};

export function sendPushNotificationToUser(userId: string, notification: any) {
  const socketId = connectedUsers[userId];
  if (socketId) {
    io.to(socketId).emit("notification", notification);
  }
}
io.on("connection", (socket: Socket) => {
  // Event fired when a user connects
  socket.on("userConnected", (userId) => {
    connectedUsers[userId] = socket.id;
  });

  // Event fired when a user disconnects
  socket.on("disconnect", () => {
    const userId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );
    delete connectedUsers[userId];
  });
});

// Trigger notification

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
