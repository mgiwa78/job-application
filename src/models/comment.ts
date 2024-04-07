import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";

export interface TComment {
  body: string;
  post: string;
  author: string;
  likes: string[];
}

export interface TCommentDoc extends Doc, TComment {}

interface TCommentModel extends Model<TCommentDoc> {
  build(attrs: TComment): TCommentDoc;
}

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

CommentSchema.set("timestamps", true);

const Comment: TCommentModel = (mongoose.models?.Comment ||
  mongoose.model<TCommentDoc, TCommentModel>(
    "Comment",
    CommentSchema
  )) as TCommentModel;

export { Comment };
