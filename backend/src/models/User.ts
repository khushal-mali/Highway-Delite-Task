import mongoose from "mongoose";
import { randomUUID } from "crypto";

const noteSchema = new mongoose.Schema({
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
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [noteSchema],
});

export default mongoose.model("User", userSchema);
