import express from "express";
import { verifyUser } from "../middleware/auth.js";
import { addComment, getCommentsByMovie } from "../controllers/commentController.js";

const router = express.Router();

// 🔒 Only logged-in users can post comments
router.post("/", verifyUser, addComment);

// 🌐 Public route to fetch comments by movie ID
router.get("/:movieId", getCommentsByMovie);

export default router;
