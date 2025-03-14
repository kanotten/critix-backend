import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import movie from "./movie"; // Only keeping movie schema

export default createSchema({
  name: "default",
  types: schemaTypes.concat([movie]), // Only registering movies
});
