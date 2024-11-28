// app/routes.ts

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route(":slug", "routes/post.tsx"),
  route("resource/preview/enable", "routes/resource/preview/enable.ts"),
  route("resource/preview/disable", "routes/resource/preview/disable.ts"),
] satisfies RouteConfig;
