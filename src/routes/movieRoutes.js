import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.js";

const router = express.Router();

// 🎥 Public Routes
router.get("/", getMovies);
router.get("/:id", getMovieById);

// 🛡️ Protected Routes (Only Admin)
router.post("/", verifyAdmin, createMovie);
router.patch("/:id", verifyAdmin, updateMovie);
router.delete("/:id", verifyAdmin, deleteMovie);

// 👤 User Routes (Users can rate & comment)
router.post("/:id/comment", verifyUser, (req, res) => {
  res.json({ message: "Comment added successfully" });
});

export default router;
