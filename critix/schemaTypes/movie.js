export default {
  name: "movie",
  type: "document",
  title: "Movies",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "text", title: "Description" },
    { name: "genre", type: "string", title: "Genre" },
    { name: "releaseYear", type: "number", title: "Release Year" },
    { name: "poster", type: "url", title: "Poster Image" },
  ],
};
