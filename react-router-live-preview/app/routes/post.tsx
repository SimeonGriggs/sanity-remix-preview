// app/routes/post.tsx

import type { SanityDocument } from "@sanity/client";
import type { Route } from "./+types/post";
import Post from "~/components/Post";
import { loadQuery } from "~/sanity/loader.server";
import { POST_QUERY } from "~/sanity/queries";
import { loadQueryOptions } from "~/sanity/loadQueryOptions";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { options } = await loadQueryOptions(request.headers);
  const { data } = await loadQuery<SanityDocument>(POST_QUERY, params, options);

  return { data };
};

export default function PostRoute({ loaderData }: Route.ComponentProps) {
  return <Post post={loaderData.data} />;
}
