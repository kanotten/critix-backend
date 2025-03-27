import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// Import your custom schemas
import movie from "./movie";
import comment from "./comment";
import rating from "./rating"; 

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    movie,
    comment,
    rating
  ]),
});
