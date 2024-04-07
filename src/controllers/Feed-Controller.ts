import { Request, Response } from "express";
import { TUser, User, TUserDoc } from "../models/user";
import { Notification } from "../models/notification";
import { Post } from "../models/post";
import { PAGE_SIZE } from "../__CONSTANTS__";

// Fetch User personalized feed
export const Fetch_USER_FEED__GET = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const pageNumber = req?.query?.pageNumber;

    const no_of_docs_each_page = 10;
    const current_page_number = Number(pageNumber) || 0;

    const user: TUserDoc = await User.findById(userId).populate("followers");
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    const y = await User.find();

    const userIFollow = y.filter((usr) => {
      return usr.followers.includes(userId);
    });

    const postsFeed = await Post.find({ author: { $in: userIFollow } })
      .skip(no_of_docs_each_page * current_page_number)
      .limit(no_of_docs_each_page)
      .populate("likes")
      .populate("comments")
      .sort({ createdAt: -1 })
      .exec();

    return res.json({ status: "success", data: postsFeed });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
