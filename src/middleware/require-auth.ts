import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../__CONSTANTS__";
import { User } from "../models/user";

interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Authentication is required" });
  }

  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    JWT_SECRET
  ) as unknown as DecodedToken;

  if (!decoded) {
    return res
      .status(409)
      .json({ status: "error", message: "Authentication is required" });
  }

  try {
    const userData = await User.findById(decoded.user._id);

    if (userData) {
      req.user = {
        id: decoded.user._id,
        ...userData,
      };
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "User Not Found" });
    }
    next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return res
      .status(409)
      .json({ status: "error", error: "Authentication is required" });
  }
};
