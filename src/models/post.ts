import mongoose, { Document as Doc, Model } from "mongoose";

export interface TPost {
  body: string;
  image: string;
  author: string;
  comments: Array<string>;
  video: string;
  likes: Array<string>;
}

export interface TPostDoc extends Doc, TPost {}

interface TPostModel extends Model<TPostDoc> {
  build(attrs: TPost): TPostDoc;
}

const PostSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
PostSchema.set("timestamps", true);

const Post: TPostModel = (mongoose.models?.Post ||
  mongoose.model<TPostDoc, TPostModel>("Post", PostSchema)) as TPostModel;

export { Post };
