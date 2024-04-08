"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    body: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
PostSchema.set("timestamps", true);
const Post = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Post) ||
    mongoose_1.default.model("Post", PostSchema));
exports.Post = Post;
//# sourceMappingURL=post.js.map