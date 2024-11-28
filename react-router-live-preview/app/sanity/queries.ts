// app/sanity/queries.ts

import { defineQuery } from "groq";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
);
export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`
);
