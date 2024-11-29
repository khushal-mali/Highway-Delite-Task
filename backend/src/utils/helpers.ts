import nodemailer from "nodemailer";
import crypto from "crypto";

// Generate OTP
export function generateOtp(length: number = 6): string {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

// Send OTP Email
export async function sendOtp(email: string, otp: string): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER and EMAIL_PASS must be defined in the environment variables."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #4CAF50;">Your OTP Code</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">Here is your one-time password (OTP) for verification:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; color: #ffffff; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">This OTP is valid for the next 5 minutes. Please do not share it with anyone.</p>
      <p style="font-size: 16px; color: #333;">Thank you,</p>
      <p style="font-size: 16px; color: #333;">The YourApp Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: "YourApp <no-reply@yourapp.com>",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
    html: htmlTemplate,
  });
}
