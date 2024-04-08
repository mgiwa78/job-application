"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middleware/require-auth");
const Notification_Controller_1 = require("../controllers/Notification-Controller");
const notificationsRouter = express_1.default.Router();
notificationsRouter.get("/", require_auth_1.AuthenticateUser, Notification_Controller_1.Fetch__NOTIFICATIONS__GET);
exports.default = notificationsRouter;
//# sourceMappingURL=notificationsRouter.js.map