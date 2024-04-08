import { Request, Response } from "express";
import { Post, TPostDoc } from "../models/post";
import { User } from "../models/user";
import {
  notifyNewPostByFollowedUser,
  notifyNewPostLike,
} from "../services/notifications";

// Create new post
export const Create__POST__POST = async (req: Request, res: Response) => {
  try {
    const { body } = req.body;

    const post: TPostDoc = await Post.create({
      body,
      author: req.user.id,
    });
    post.save();

    const user = await User.findById(req.user.id);

    user.followers.forEach((follower) => {
      notifyNewPostByFollowedUser(user, follower);
    });

    return res.json({ status: "success", data: post });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update new post
export const Update__POST__PUT = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { body, author } = req.body;

    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    await Post.findByIdAndUpdate(postId, {
      body,
      author: req.user.id,
    });

    const post = await Post.findById(postId);
    return res.json({ status: "success", data: post });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Like post
export const Like__POST__PUT = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    const postD = await Post.findById(postId);
    const userLiked = postD.likes.includes(req.user.id);

    if (!userLiked) {
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: req.user.id },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: req.user.id },
      });
    }

    const post = await Post.findById(postId);
    const user = await User.findById(req.user.id);

    notifyNewPostLike(post.author, user);

    return res.json({ status: "success", data: post });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Fetch post
export const Fetch__POST__GET = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }
    const post: TPostDoc = await Post.findById(postId);

    return res.json({ status: "success", data: post });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Set post image
export const SET_POST_IMAGE__PUT = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { image } = req.body;

    if (!Post.findById(postId).exists) {
      return res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    const post: TPostDoc = await Post.findById(postId);

    if (post.author?.toString() !== req.user.id) {
      return res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    post.image = image;
    post.save();

    const posts = await Post.find();

    return res.json({ status: "success", data: posts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Set post video
export const SET_POST_VIDEO__PUT = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { video } = req.body;

    if (!Post.findById(postId).exists) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    const post: TPostDoc = await Post.findById(postId);
    if (post.author?.toString() !== req.user.id) {
      return res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    post.video = video;
    post.save();

    console.log(post);
    const posts = await Post.find();

    return res.json({ status: "success", data: posts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete post
export const Delete__POST__DELETE = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    if (post.author?.toString() !== req.user.id) {
      return res.status(400).json({ status: "error", error: "Invalid Post" });
    }

    await Post.findByIdAndDelete(postId);

    const posts = await Post.find();

    return res.json({ status: "success", data: posts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
