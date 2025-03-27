import express from "express";
import { addComment, getCommentsByMovie } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment); // POST /api/comments
router.get("/:movieId", getCommentsByMovie); // GET /api/comments/:movieId

export default router;
