export default {
    name: "rating",
    title: "Rating",
    type: "document",
    fields: [
      {
        name: "value",
        title: "Rating (1-5)",
        type: "number",
        validation: (Rule) => Rule.min(1).max(5),
      },
      {
        name: "author",
        title: "Author Email",
        type: "string",
      },
      {
        name: "movie",
        title: "Movie",
        type: "reference",
        to: [{ type: "movie" }],
      },
      {
        name: "createdAt",
        type: "datetime",
        title: "Created At",
      },
    ],
  };
  