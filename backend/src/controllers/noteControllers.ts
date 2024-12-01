import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

// TypeScript types for better validation
interface NoteInput {
  title: string;
  content: string;
  tags?: string;
  importance?: "Low" | "Medium" | "High";
}

interface AddNoteRequest extends Request {
  body: NoteInput;
}

export const createNewNote = async (req: AddNoteRequest, res: Response) => {
  const { title, content, tags, importance } = req.body;
  const userId = res.locals.jwtData.userId;

  try {
    // Validate required fields
    if (!userId || !title || !content) {
      return res
        .status(400)
        .json({ error: "Token, title, and content are required." });
    }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create the new note
    const newNote = {
      title,
      content,
      tags,
      importance: importance || "Medium", // Default to "Medium" if not provided
    };

    // Add the note to the user's notes array
    user.notes.push(newNote);

    // Save the user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Note added successfully.", note: newNote });
  } catch (error) {
    console.error("Error adding note:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the note." });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  const userId = res.locals.jwtData.userId;

  try {
    // Find the user by their ID, including the notes field, and sort the notes in descending order
    const user = await User.findById(userId)
      .select("notes -_id") // Only return the notes field
      .populate({
        path: "notes",
        options: { sort: { createdAt: -1 } }, // Sort notes by createdAt in descending order
      });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return all notes for the user, sorted by createdAt in descending order
    return res.status(200).json({
      message: "Notes fetched successfully.",
      notes: user.notes, // Notes are now sorted by createdAt in descending order
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the notes." });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id: noteId } = req.params;
  const userId = res.locals.jwtData.userId;

  console.log(noteId);

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the index of the note to be deleted
    const noteIndex = user.notes.findIndex(
      (note) => String(note._id) === noteId
    );

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found." });
    }

    // Remove the note from the array
    const deletedNote = user.notes.splice(noteIndex, 1);

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      message: "Note deleted successfully.",
      deletedNote: deletedNote[0], // Return the deleted note object
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the note." });
  }
};
