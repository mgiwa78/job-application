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
exports.Delete__POST__DELETE = exports.SET_POST_VIDEO__PUT = exports.SET_POST_IMAGE__PUT = exports.Fetch__POST__GET = exports.Like__POST__PUT = exports.Update__POST__PUT = exports.Create__POST__POST = void 0;
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const app_1 = require("../app");
const notifications_1 = require("../services/notifications");
// Create new post
const Create__POST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req.body;
        const post = yield post_1.Post.create({
            body,
            author: req.user.id,
        });
        post.save();
        const postData = yield post_1.Post.findById(post._id).populate("author");
        (0, app_1.notifyNewPostByFollowedUser)(req.user.id, postData);
        console.log(post);
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__POST__POST = Create__POST__POST;
// Update new post
const Update__POST__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { body, author } = req.body;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        yield post_1.Post.findByIdAndUpdate(postId, {
            body,
            author: req.user.id,
        });
        const post = yield post_1.Post.findById(postId);
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__POST__PUT = Update__POST__PUT;
// Like post
const Like__POST__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        const postD = yield post_1.Post.findById(postId);
        const userLiked = postD.likes.includes(req.user.id);
        if (!userLiked) {
            yield post_1.Post.findByIdAndUpdate(postId, {
                $push: { likes: req.user.id },
            });
        }
        else {
            yield post_1.Post.findByIdAndUpdate(postId, {
                $pull: { likes: req.user.id },
            });
        }
        const post = yield post_1.Post.findById(postId);
        const user = yield user_1.User.findById(req.user.id);
        (0, notifications_1.notifyNewPostLike)(post.author, user);
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Like__POST__PUT = Like__POST__PUT;
// Fetch post
const Fetch__POST__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        const post = yield post_1.Post.findById(postId);
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__POST__GET = Fetch__POST__GET;
// Set post image
const SET_POST_IMAGE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { postId } = req.params;
        const { image } = req.body;
        if (!post_1.Post.findById(postId).exists) {
            return res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        const post = yield post_1.Post.findById(postId);
        if (((_a = post.author) === null || _a === void 0 ? void 0 : _a.toString()) !== req.user.id) {
            return res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        post.image = image;
        post.save();
        const posts = yield post_1.Post.find();
        return res.json({ status: "success", data: posts });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.SET_POST_IMAGE__PUT = SET_POST_IMAGE__PUT;
// Set post video
const SET_POST_VIDEO__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { postId } = req.params;
        const { video } = req.body;
        if (!post_1.Post.findById(postId).exists) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        const post = yield post_1.Post.findById(postId);
        if (((_b = post.author) === null || _b === void 0 ? void 0 : _b.toString()) !== req.user.id) {
            return res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        post.video = video;
        post.save();
        console.log(post);
        const posts = yield post_1.Post.find();
        return res.json({ status: "success", data: posts });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.SET_POST_VIDEO__PUT = SET_POST_VIDEO__PUT;
// Delete post
const Delete__POST__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { postId } = req.params;
        const post = yield post_1.Post.findById(postId);
        if (!post) {
            res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        if (((_c = post.author) === null || _c === void 0 ? void 0 : _c.toString()) !== req.user.id) {
            return res.status(400).json({ status: "error", error: "Invalid Post" });
        }
        yield post_1.Post.findByIdAndDelete(postId);
        const posts = yield post_1.Post.find();
        return res.json({ status: "success", data: posts });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__POST__DELETE = Delete__POST__DELETE;
//# sourceMappingURL=Post-Controller.js.map