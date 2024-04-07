import { Request, Response } from "express";
import { TUser, User, TUserDoc } from "../models/user";
import { Notification } from "../models/notification";
import { notifyNewFollower } from "../services/notifications";

// Update user profile
export const Update__USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { email, avatar, firstName, lastName } = req.body;

    const user: TUserDoc = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        email,
        lastName,
        ...(avatar && { avatar }),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating own profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Fetch user profile
export const Fetch__PROFILE__GET = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const userData = await User.findById(user.id).populate("followers");

    return res.json({ status: "success", data: userData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Follow user
export const Follow__USER__PUT = async (req: Request, res: Response) => {
  try {
    const { toBeFollowed } = req.body;

    if (toBeFollowed === req.user.id)
      return res
        .status(400)
        .json({ status: "error", error: "Cant Follow yourself" });

    await User.findByIdAndUpdate(toBeFollowed, {
      $push: { followers: req.user.id },
    });

    const user = await User.findById(req.user.id);

    notifyNewFollower(toBeFollowed, user);

    return res.json({ status: "success" });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
