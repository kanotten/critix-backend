import sanityClient from "../config/sanityClient.js";

export const addRating = async (req, res) => {
  const { movieId, value, author } = req.body;

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
