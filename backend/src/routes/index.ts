import { Router } from "express";
import userRoutes from "./userRoutes.js";
import noteRoutes from "./noteRoutes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/note", noteRoutes); //domain/api/v1/note

export default appRouter;
