import express from "express";
import client from "../config/sanityClient.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await client.fetch(
      `*[_type == "movie"]{_id, title, description, genre, releaseYear, "poster": poster.asset->url}`
    );
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
});

export default router;
