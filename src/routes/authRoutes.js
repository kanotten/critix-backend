import express from "express";
import { loginAdmin, registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// 🛡️ Admin Login Route
router.post("/admin-login", loginAdmin);

// 👤 User Authentication Routes
router.post("/register", registerUser);
router.post("/user-login", loginUser);

export default router;
