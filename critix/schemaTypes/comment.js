export default {
    name: "comment",
    type: "document",
    title: "Comment",
    fields: [
      {
        name: "content",
        type: "text",
        title: "Comment",
      },
      {
        name: "author",
        type: "string",
        title: "Author Email",
      },
      {
        name: "movie",
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
  