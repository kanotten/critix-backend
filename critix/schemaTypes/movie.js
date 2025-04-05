export default {
  name: "movie",
  type: "document",
  title: "Movies",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "genre",
      type: "string",
      title: "Genre",
    },
    {
      name: "rating",
      type: "number",
      title: "Rating",
    },
    {
      name: "releaseYear",
      type: "number",
      title: "Release Year",
    },
    {
      name: "poster",
      type: "image",
      title: "Poster",
    },
  ],
};