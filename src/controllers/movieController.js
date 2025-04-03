import client from "../config/sanityClient.js";

// 🔹 Fetch all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await client.fetch(
      `*[_type == "movie"]{_id, title, description, genre, releaseYear, "poster": poster.asset->url}`
    );
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// 🔹 Fetch a single movie by ID
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await client.fetch(`*[_type == "movie" && _id == "${id}"][0]`);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};
// 🔹 Add a new movie (Admin)
export const createMovie = async (req, res) => {
  const { title, description, genre, rating, releaseYear } = req.body;
  const file = req.file; // This retrieves the uploaded file

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." }); // Early return if no file
  }

  try {
    // Upload the image to Sanity
    const asset = await client.assets.upload('image', file.buffer, {
      contentType: file.mimetype,
      filename: file.originalname,
    });

    // Prepare movie data including the poster URL
    const newMovie = await client.create({
      _type: "movie",
      title,
      description,
      genre,
      rating,
      releaseYear,
      poster: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id, // Reference to the uploaded asset
        },
      },
    });s

    return res.status(201).json(newMovie); // Success response
  } catch (error) {
    console.error('Error creating movie:', error); // Log the error to server console
    return res.status(500).json({ message: "Error creating movie", error: error.message });
  }
};

// 🔹 Update a movie (Admin)
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedMovie = await client.patch(id).set(updates).commit();
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

// 🔹 Delete a movie (Admin)
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await client.delete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};
