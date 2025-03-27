import express from "express";
import { addRating, getRatingsByMovie } from "../controllers/ratingController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyUser, addRating); // POST /api/ratings
router.get("/:movieId", getRatingsByMovie); // GET /api/ratings/:movieId

export default router;
