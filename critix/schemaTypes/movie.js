export default {
  name: "movie",
  type: "document",
  title: "Movies",
  fields: [
    {
      title: 'string',
      description: 'string',
      genre: 'string',
      rating: 'number',
      releaseYear: 'number',
      poster: {
        _type: 'image',
        url: 'string',
      }
    }
  ],
};
