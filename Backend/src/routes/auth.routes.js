import { Router } from "express";
import { registerController, verifyEmailController } from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { registerValidation } from "../validations/auth.validator.js";

const authRoutes = Router()

authRoutes.post("/register",registerValidation,upload.single("profile_img"), registerController);

authRoutes.get("/verify_email", verifyEmailController);

export default authRoutes;