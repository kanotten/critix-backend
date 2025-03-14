import express from "express";
import client from "../config/sanity.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await client.fetch('*[_type == "movie"]');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
