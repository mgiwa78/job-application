import { Request, Response } from "express";
import { Notification } from "../models/notification";

// Fetch user notifications
export const Fetch__NOTIFICATIONS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req;
    const notifications = await Notification.find({ user: user.id });

    return res.json({ status: "success", data: notifications });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
