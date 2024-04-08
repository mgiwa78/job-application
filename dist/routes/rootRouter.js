"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const postsRouter_1 = __importDefault(require("./postsRouter"));
const commentsRouter_1 = __importDefault(require("./commentsRouter"));
const feedRouter_1 = __importDefault(require("./feedRouter"));
const notificationsRouter_1 = __importDefault(require("./notificationsRouter"));
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Social Media API is online and running");
});
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.use("/feed", feedRouter_1.default);
rootRouter.use("/comments", commentsRouter_1.default);
rootRouter.use("/posts", postsRouter_1.default);
rootRouter.use("/notifications", notificationsRouter_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map