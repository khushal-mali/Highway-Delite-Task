import mongoose from "mongoose";
import { randomUUID } from "crypto";

const noteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: randomUUID,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    importance: {
      type: String,
      enum: ["Low", "Medium", "High"], // Importance levels
      default: "Medium", // Default to medium importance
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  notes: [noteSchema],
});

export default mongoose.model("User", userSchema);
