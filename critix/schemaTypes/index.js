import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import movie from "./movie.js";
import comment from "./comment.js";
import rating from "./rating.js";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    movie,
    comment,
    rating
  ]),
});
