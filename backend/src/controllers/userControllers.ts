import { NextFunction, Request, Response } from "express";
import { generateOtp, sendOtp } from "../utils/helpers.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../utils/constants.js";

export async function signup(req: Request, res: Response) {
  const { email, name, dob } = req.body;

  if (!email) {
    return res.status(500).json({ error: "Email not found!!!" });
  }

  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = await User.findOneAndUpdate(
      { email, name, dob },
      {
        otp: hashedOtp,
        otpExpiresAt: Date.now() + 5 * 60 * 1000,
        isVerified: false,
      },
      { upsert: true, new: true }
    );

    await sendOtp(email, otp);
    res.status(201).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Error during signup, ${err}` });
  }
}

export async function verifySignupOtp(req: Request, res: Response) {
  const { email, otp, keepMeLoggedIn } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.otp || user.otpExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ error: "OTP expired or invalid." });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    // Set expiration time dynamically based on keepMeLoggedIn
    const expiresIn = keepMeLoggedIn ? "30d" : "1d"; // 1 month if true, 1 day if false
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn,
    });

    // Set HttpOnly cookie with dynamic max age
    const cookieMaxAge = keepMeLoggedIn
      ? 30 * 24 * 60 * 60 * 1000 // 1 month in milliseconds
      : 24 * 60 * 60 * 1000; // 1 day in milliseconds

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
    });

    // Clear OTP and mark user as verified
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.isVerified = true;
    await user.save();

    res.status(201).json({
      message: "Signup successful! You are now logged in.",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error during OTP verification.${error.message}` });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      res.status(404).json({ error: "User not found or not verified." });
      return;
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendOtp(email, otp);

    res.status(201).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ error: "Error during login." });
  }
}

export async function verifyLoginOtp(
  req: Request,
  res: Response
): Promise<void> {
  const { email, otp, keepMeLoggedIn } = req.body;

  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    if (!user.otp || user.otpExpiresAt.getTime() < Date.now()) {
      res.status(400).json({ error: "OTP expired or invalid." });
      return;
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      res.status(400).json({ error: "Invalid OTP." });
      return;
    }

    // Set expiration time dynamically based on keepMeLoggedIn
    const expiresIn = keepMeLoggedIn ? "30d" : "1d"; // 1 month if true, 1 day if false
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn,
    });

    // Set HttpOnly cookie with dynamic max age
    const cookieMaxAge = keepMeLoggedIn
      ? 30 * 24 * 60 * 60 * 1000 // 1 month in milliseconds
      : 24 * 60 * 60 * 1000; // 1 day in milliseconds

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
    });

    // Clear OTP and mark user as verified
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.isVerified = true;
    await user.save();

    res.status(201).json({
      message: "Login successful! You are now logged in.",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error during OTP verification. ${error.message}` });
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  try {
    //user token check
    console.log(res.locals.jwtData.userId);
    const user = await User.findById(res.locals.jwtData.userId);

    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.jwtData.userId) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      dob: user.dob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.userId);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.jwtData.userId) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res.status(200).json({ message: "You are Logged out." });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
