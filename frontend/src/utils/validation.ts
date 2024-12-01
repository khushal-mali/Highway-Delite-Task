import z from "zod";

export const signupOtpVal = z.object({
  name: z.string().min(1).max(30, "To long name"),
  email: z.string().email(),
  dob: z.date(),
});

export const verifySignupOptVal = z.object({
  name: z.string().min(1).max(30, "To long name"),
  email: z.string().email(),
  dob: z.date(),
  otp: z
    .string()
    .min(6, "OTP should contain 6 numbers")
    .max(6, "OTP should only contain 6 numbers"),
});
