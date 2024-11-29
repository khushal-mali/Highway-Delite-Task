import { Router } from "express";
import {
  login,
  signup,
  verifyLoginOtp,
  verifySignupOtp,
} from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.post("/signup", signup);
userRoutes.post("/verifySignup", verifySignupOtp);
userRoutes.post("/login", login);
userRoutes.post("/verifyLogin", verifyLoginOtp);

export default userRoutes;
