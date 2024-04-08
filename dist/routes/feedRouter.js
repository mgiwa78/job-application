"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Feed_Controller_1 = require("../controllers/Feed-Controller");
const require_auth_1 = require("../middleware/require-auth");
const feedRouter = express_1.default.Router();
feedRouter.get("/", require_auth_1.AuthenticateUser, Feed_Controller_1.Fetch_USER_FEED__GET);
exports.default = feedRouter;
//# sourceMappingURL=feedRouter.js.map