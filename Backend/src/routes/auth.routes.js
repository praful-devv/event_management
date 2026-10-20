import { Router } from "express";
import { registerController, verifyEmailController } from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const authRoutes = Router()

authRoutes.post("/register",upload.single("profile_img"), registerController);

authRoutes.get("/verify_email", verifyEmailController);

export default authRoutes;