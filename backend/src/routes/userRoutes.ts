import { Router } from "express";
import {
  login,
  signup,
  userLogout,
  verifyLoginOtp,
  verifySignupOtp,
  verifyUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/middlewares.js";

const userRoutes = Router();

userRoutes.post("/signup", signup);
userRoutes.post("/verifySignup", verifySignupOtp);
userRoutes.post("/login", login);
userRoutes.post("/verifyLogin", verifyLoginOtp);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
