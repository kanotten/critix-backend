import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// Movie Routes
router.get("/", getMovies); // Fetch all movies
router.get("/:id", getMovieById); // Fetch a single movie
router.post("/", createMovie); // Add a new movie (Admin)
router.patch("/:id", updateMovie); // Update a movie (Admin)
router.delete("/:id", deleteMovie); // Delete a movie (Admin)

export default router;
