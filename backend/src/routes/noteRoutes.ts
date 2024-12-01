import { Router } from "express";
import { verifyToken } from "../middleware/middlewares.js";
import { createNewNote, getAllNotes } from "../controllers/noteControllers.js";

const noteRoutes = Router();

noteRoutes.post("/create", verifyToken, createNewNote);
noteRoutes.post("/getAll", verifyToken, getAllNotes);

export default noteRoutes;
