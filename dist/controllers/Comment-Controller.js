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
exports.Delete__COMMENT__DELETE = exports.Fetch__COMMENT__GET = exports.Fetch__COMMENTS__GET = exports.Like__COMMENT__PUT = exports.Update__COMMENT__PUT = exports.Create__COMMENT__POST = void 0;
const comment_1 = require("../models/comment");
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const notifications_1 = require("../services/notifications");
// Create Comment
const Create__COMMENT__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { body } = req.body;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        const comment = yield comment_1.Comment.create({
            body,
            postId,
            author: req.user.id,
        });
        comment.save();
        const postData = yield post_1.Post.findById(postId);
        yield post_1.Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id },
            new: true,
        });
        const user = yield user_1.User.findById(req.user.id);
        (0, notifications_1.notifyNewComment)(postData.author, user);
        return res.json({ status: "success", data: comment });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__COMMENT__POST = Create__COMMENT__POST;
// Update Comment
const Update__COMMENT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        if (!comment_1.Comment.findById(commentId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Comment" });
        }
        const { body } = req.body;
        const { postId } = req.params;
        yield comment_1.Comment.findByIdAndUpdate(commentId, {
            body,
            postId,
            author: req.user.id,
        });
        const comment = yield comment_1.Comment.findById(commentId);
        return res.json({ status: "success", data: comment });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__COMMENT__PUT = Update__COMMENT__PUT;
// Like Comment
const Like__COMMENT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        if (!comment_1.Comment.findById(commentId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Comment" });
        }
        const commentD = yield comment_1.Comment.findById(commentId);
        const userLiked = commentD.likes.includes(req.user.id);
        if (!userLiked) {
            yield comment_1.Comment.findByIdAndUpdate(commentId, {
                $push: { likes: req.user.id },
            });
        }
        else {
            yield comment_1.Comment.findByIdAndUpdate(commentId, {
                $pull: { likes: req.user.id },
            });
        }
        const comment = yield comment_1.Comment.findById(commentId);
        const user = yield user_1.User.findById(req.user.id);
        (0, notifications_1.notifyNewCommentLike)(comment.author, user);
        return res.json({ status: "success", data: comment });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Like__COMMENT__PUT = Like__COMMENT__PUT;
// Fetch post Comments
const Fetch__COMMENTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.postId;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Comment" });
        }
        const comments = yield comment_1.Comment.find({ post: postId });
        return res.json({ status: "success", data: comments });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMMENTS__GET = Fetch__COMMENTS__GET;
// Fetch Comment
const Fetch__COMMENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        if (!comment_1.Comment.findById(commentId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Comment" });
        }
        const comment = yield comment_1.Comment.findById(commentId);
        return res.json({ status: "success", data: comment });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMMENT__GET = Fetch__COMMENT__GET;
// Delete Comment
const Delete__COMMENT__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        if (!comment_1.Comment.findById(commentId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Comment" });
        }
        yield comment_1.Comment.findByIdAndDelete(commentId);
        const comments = yield comment_1.Comment.find();
        return res.json({ status: "success", data: comments });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__COMMENT__DELETE = Delete__COMMENT__DELETE;
//# sourceMappingURL=Comment-Controller.js.map