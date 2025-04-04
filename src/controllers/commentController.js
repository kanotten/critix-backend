import sanityClient from "../config/sanityClient.js";


export const addComment = async (req, res) => {
  const { movieId, content } = req.body;
  const author = req.user?.email; 

  if (!movieId || !content) {
    return res.status(400).json({ error: "Missing movieId or content." });
  }

  try {
    const result = await sanityClient.create({
      _type: "comment",
      content,
      author,
      movie: {
        _type: "reference",
        _ref: movieId,
      },
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(result);
  } catch (err) {
    console.error("Sanity error:", err.message);
    res.status(500).json({ error: "Failed to add comment", details: err.message });
  }
};


export const getCommentsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const comments = await sanityClient.fetch(
      `*[_type == "comment" && movie._ref == $movieId] | order(createdAt desc)`,
      { movieId }
    );

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments", details: err.message });
  }
};
