import client from "../config/sanityClient.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await client.fetch(
      `*[_type == "movie"]{title, description, genre, releaseYear, poster}`
    );
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};
