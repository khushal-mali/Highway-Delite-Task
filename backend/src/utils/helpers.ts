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
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f1f5f8; border: 1px solid #e1e7ec; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #4CAF50; font-size: 28px; margin-bottom: 20px; font-weight: bold;">Your OTP Code</h2>
      <p style="font-size: 18px; color: #555; line-height: 1.6;">Hello,</p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">Here is your one-time password (OTP) for verification:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; color: #ffffff; background-color: #4CAF50; padding: 15px 30px; border-radius: 8px; font-weight: bold;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">This OTP is valid for the next 5 minutes. Please do not share it with anyone.</p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">If you did not request this OTP, please disregard this email.</p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">Thank you,</p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">The YourApp Team</p>
      <footer style="text-align: center; font-size: 14px; color: #888; margin-top: 40px;">
        <p>&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
      </footer>
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
