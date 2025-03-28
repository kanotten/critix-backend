import sanityClient from "../config/sanityClient.js";

// 🔹 Add new rating
export const addRating = async (req, res) => {
  const { movieId, value } = req.body;
  const author = req.user.email;

  try {
    const result = await sanityClient.create({
      _type: "rating",
      value,
      author,
      movie: {
        _type: "reference",
        _ref: movieId,
      },
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add rating", details: err.message });
  }
};

// 🔹 Get all ratings for a movie
export const getRatingsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const ratings = await sanityClient.fetch(
      `*[_type == "rating" && movie._ref == $movieId]`,
      { movieId }
    );

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings", details: err.message });
  }
};

// 🔹 Get current user's rating for a movie
export const getUserRating = async (req, res) => {
  const { movieId } = req.params;
  const email = req.user.email;

  try {
    const query = `*[_type == "rating" && movie._ref == $movieId && author == $email][0]`;
    const userRating = await sanityClient.fetch(query, {
      movieId,
      email,
    });

    if (!userRating) {
      return res.json({ rating: null });
    }

    res.json({ rating: userRating.value });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user rating", details: err.message });
  }
};
