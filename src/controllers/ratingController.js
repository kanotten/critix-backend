import sanityClient from "../config/sanityClient.js";

// 🔹 Add or Update Rating
export const addRating = async (req, res) => {
  const { movieId, value } = req.body;
  const author = req.user.email;

  try {
    // Check if user already rated this movie
    const existing = await sanityClient.fetch(
      `*[_type == "rating" && movie._ref == $movieId && author == $author][0]`,
      { movieId, author }
    );

    let result;

    if (existing) {
      // Update existing rating
      result = await sanityClient
        .patch(existing._id)
        .set({ value, createdAt: new Date().toISOString() })
        .commit();
    } else {
      // Create new rating
      result = await sanityClient.create({
        _type: "rating",
        value,
        author,
        movie: {
          _type: "reference",
          _ref: movieId,
        },
        createdAt: new Date().toISOString(),
      });
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit rating", details: err.message });
  }
};

// 🔹 Get All Ratings + Average for a Movie
export const getRatingsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const ratings = await sanityClient.fetch(
      `*[_type == "rating" && movie._ref == $movieId]{ value }`,
      { movieId }
    );

    const total = ratings.reduce((sum, r) => sum + (r.value || 0), 0);
    const average = ratings.length > 0 ? total / ratings.length : 0;

    res.json({
      ratings,
      averageRating: average.toFixed(1),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings", details: err.message });
  }
};

// 🔹 Get Current User's Rating
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
