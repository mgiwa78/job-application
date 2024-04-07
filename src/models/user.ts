import mongoose, { Document as Doc, Model, model } from "mongoose";

export interface TUser {
  avatar: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  followers: Array<string>;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id: string;
        avatar: string;
        userName: string;
        fullName: string;
      };
    }
  }
}

export interface TUserDoc extends Doc, TUser {}

interface UserModel extends mongoose.Model<TUserDoc> {
  build(attrs: TUser): TUserDoc;
}

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatar: { type: String },
});

userSchema.set("timestamps", true);

export const User: UserModel = (mongoose.models.User ||
  model<TUserDoc>("User", userSchema)) as UserModel;
