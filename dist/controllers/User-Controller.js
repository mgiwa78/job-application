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
exports.Follow__USER__PUT = exports.Fetch__PROFILE__GET = exports.Update__USER__PUT = void 0;
const user_1 = require("../models/user");
const notifications_1 = require("../services/notifications");
// Update user profile
const Update__USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { email, avatar, firstName, lastName } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, Object.assign({ firstName,
            email,
            lastName }, (avatar && { avatar })), { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating own profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__USER__PUT = Update__USER__PUT;
// Fetch user profile
const Fetch__PROFILE__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const userData = yield user_1.User.findById(user.id).populate("followers");
        return res.json({ status: "success", data: userData });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__PROFILE__GET = Fetch__PROFILE__GET;
// Follow user
const Follow__USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { toBeFollowed } = req.body;
        if (toBeFollowed === req.user.id)
            return res
                .status(400)
                .json({ status: "error", error: "Cant Follow yourself" });
        yield user_1.User.findByIdAndUpdate(toBeFollowed, {
            $push: { followers: req.user.id },
        });
        const user = yield user_1.User.findById(req.user.id);
        (0, notifications_1.notifyNewFollower)(toBeFollowed, user);
        return res.json({ status: "success" });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Follow__USER__PUT = Follow__USER__PUT;
//# sourceMappingURL=User-Controller.js.map