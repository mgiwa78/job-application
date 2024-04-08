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
exports.Fetch_USER_FEED__GET = void 0;
const user_1 = require("../models/user");
const post_1 = require("../models/post");
// Fetch User personalized feed
const Fetch_USER_FEED__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const pageNumber = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.pageNumber;
        const no_of_docs_each_page = 10;
        const current_page_number = Number(pageNumber) || 0;
        const user = yield user_1.User.findById(userId).populate("followers");
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        const y = yield user_1.User.find();
        const userIFollow = y.filter((usr) => {
            return usr.followers.includes(userId);
        });
        const postsFeed = yield post_1.Post.find({ author: { $in: userIFollow } })
            .skip(no_of_docs_each_page * current_page_number)
            .limit(no_of_docs_each_page)
            .populate("likes")
            .populate("comments")
            .sort({ createdAt: -1 })
            .exec();
        return res.json({ status: "success", data: postsFeed });
    }
    catch (error) {
        console.error("Error fetching feed:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch_USER_FEED__GET = Fetch_USER_FEED__GET;
//# sourceMappingURL=Feed-Controller.js.map