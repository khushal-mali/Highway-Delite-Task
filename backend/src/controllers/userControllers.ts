import { Request, Response } from "express";
import { generateOtp, sendOtp } from "../utils/helpers.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response): Promise<void> {
  const { email, name } = req.body;

  if (!email) {
    res.status(500).json({ error: "Email not found!!!" });
    res.end();
  }

  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = await User.findOneAndUpdate(
      { email, name },
      {
        otp: hashedOtp,
        otpExpiresAt: Date.now() + 5 * 60 * 1000,
        isVerified: false,
      },
      { upsert: true, new: true }
    );

    await sendOtp(email, otp);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    res.status(500).json({ error: "Error during signup." });
  }
}

export async function verifySignupOtp(
  req: Request,
  res: Response
): Promise<void> {
  const { email, otp, keepMeLoggedIn } = req.body;

  try {
    const user = await User.findOne({ email });

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

    // Generate JWT token with dynamic expiration time
    const expiresIn = keepMeLoggedIn ? "1w" : "1h"; // 1 week for "keep me logged in" or 1 hour by default
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn,
    });

    // Set HttpOnly cookie with the token
    const cookieMaxAge = keepMeLoggedIn ? 7 * 24 * 60 * 60 * 1000 : 3600000; // 1 week or 1 hour

    // Set HttpOnly cookie with the token
    res.cookie("authToken", token, {
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

    res
      .status(200)
      .json({ message: "Signup successful! You are now logged in." });
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

    res.status(200).json({ message: "OTP sent to your email." });
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

    // Generate JWT token with dynamic expiration time
    const expiresIn = keepMeLoggedIn ? "1w" : "1h"; // 1 week for "keep me logged in" or 1 hour by default
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn,
    });

    // Set HttpOnly cookie with the token
    const cookieMaxAge = keepMeLoggedIn ? 7 * 24 * 60 * 60 * 1000 : 3600000; // 1 week or 1 hour

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge, // 1 hour
    });

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error during OTP verification. ${error.message}` });
  }
}
