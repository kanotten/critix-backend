import express from "express";
import {
  addRating,
  getRatingsByMovie,
  getUserRating,
} from "../controllers/ratingController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

// ✅ Specific route first
router.get("/user/:movieId", verifyUser, getUserRating);

// ✅ Then the general route
router.get("/:movieId", getRatingsByMovie);

// ✅ Rating submission
router.post("/", verifyUser, addRating);

export default router;
