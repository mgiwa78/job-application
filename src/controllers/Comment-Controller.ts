import { Request, Response } from "express";
import { Comment, TCommentDoc } from "../models/comment";

import { Post } from "../models/post";
import { User } from "../models/user";
import {
  notifyNewComment,
  notifyNewCommentLike,
} from "../services/notifications";

// Create Comment
export const Create__COMMENT__POST = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;

    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    const comment: TCommentDoc = await Comment.create({
      body,
      postId,
      author: req.user.id,
    });

    comment.save();

    const postData = await Post.findById(postId);

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
      new: true,
    });

    const user = await User.findById(req.user.id);

    notifyNewComment(postData.author, user);
    return res.json({ status: "success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update Comment
export const Update__COMMENT__PUT = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!Comment.findById(commentId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Comment" });
    }

    const { body } = req.body;
    const { postId } = req.params;

    await Comment.findByIdAndUpdate(commentId, {
      body,
      postId,
      author: req.user.id,
    });

    const comment = await Comment.findById(commentId);
    return res.json({ status: "success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Like Comment
export const Like__COMMENT__PUT = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    if (!Comment.findById(commentId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Comment" });
    }

    const commentD = await Comment.findById(commentId);
    const userLiked = commentD.likes.includes(req.user.id);

    if (!userLiked) {
      await Comment.findByIdAndUpdate(commentId, {
        $push: { likes: req.user.id },
      });
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { likes: req.user.id },
      });
    }

    const comment: TCommentDoc = await Comment.findById(commentId);

    const user = await User.findById(req.user.id);

    notifyNewCommentLike(comment.author, user);

    return res.json({ status: "success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Fetch post Comments
export const Fetch__COMMENTS__GET = async (req: Request, res: Response) => {
  try {
    const postId = req.params?.postId;
    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Comment" });
    }
    const comments = await Comment.find({ post: postId });
    return res.json({ status: "success", data: comments });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Fetch Comment
export const Fetch__COMMENT__GET = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    if (!Comment.findById(commentId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Comment" });
    }

    const comment: TCommentDoc = await Comment.findById(commentId);

    return res.json({ status: "success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete Comment
export const Delete__COMMENT__DELETE = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    if (!Comment.findById(commentId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Comment" });
    }
    await Comment.findByIdAndDelete(commentId);
    const comments = await Comment.find();

    return res.json({ status: "success", data: comments });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
