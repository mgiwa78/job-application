"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch__NOTIFICATIONS__GET = void 0;
const notification_1 = require("../models/notification");
// Fetch user notifications
const Fetch__NOTIFICATIONS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const notifications = yield notification_1.Notification.find({ user: user.id });
        return res.json({ status: "success", data: notifications });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__NOTIFICATIONS__GET = Fetch__NOTIFICATIONS__GET;
//# sourceMappingURL=Notification-Controller.js.map