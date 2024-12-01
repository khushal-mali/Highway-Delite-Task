import { Router } from "express";
import { verifyToken } from "../middleware/middlewares.js";
import {
  createNewNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteControllers.js";

const noteRoutes = Router();

noteRoutes.post("/create", verifyToken, createNewNote);
noteRoutes.get("/getAll", verifyToken, getAllNotes);
noteRoutes.delete("/delete/:id", verifyToken, deleteNote);

export default noteRoutes;
