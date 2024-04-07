import { Request, Response } from "express";
import { User, TUserDoc } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Password } from "../services/password";
import { JWT_SECRET } from "../__CONSTANTS__";

interface DecodedToken extends JwtPayload {
  token: string;
}

// User signin
export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: TUserDoc = await User.findOne({ email: email }).populate(
      "followers"
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const verifyPassword = await Password.compare(user.password, password);

    if (verifyPassword) {
      console.log(user);
      const token = jwt.sign({ user }, JWT_SECRET);

      return res.status(200).json({
        userAuth: {
          email: user.email,
          fullName: user.fullName,
          followers: user.followers,
        },
        userJwt: token,
      });
    }

    return res.status(400).json({ message: "Invalid user credentials" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

// User signup
export const SignUp__AUTH__POST = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, userName } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({ error: "Email Already in use" });
    }
    const existingUsername = await User.findOne({ email: email });

    if (existingUsername) {
      return res.status(401).json({ error: "Username Already in use" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
      userName: userName,
    });

    const userData = { ...user.toObject(), password: null as string };

    const token = jwt.sign({ user: userData }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
    console.log(token);

    res.json({
      status: "success",
      data: { userAuth: userData, userJwt: token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// User get profile
export const Fetch__USER_PROFILE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData?.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
