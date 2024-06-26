"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    body: {
        type: String,
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
CommentSchema.set("timestamps", true);
const Comment = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Comment) ||
    mongoose_1.default.model("Comment", CommentSchema));
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map