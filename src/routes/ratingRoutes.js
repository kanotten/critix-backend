import express from "express";
import { addRating, getRatingsByMovie, getUserRating } from "../controllers/ratingController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyUser, addRating); // POST /api/ratings
router.get("/:movieId", getRatingsByMovie); // GET /api/ratings/:movieId

// New route to get logged-in user's rating
router.get("/:movieId/user", verifyUser, getUserRating);

export default router;


