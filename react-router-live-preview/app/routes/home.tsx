// app/routes/home.tsx

import type { SanityDocument } from "@sanity/client";
import Posts from "~/components/Posts";
import { loadQuery } from "~/sanity/loader.server";
import { POSTS_QUERY } from "~/sanity/queries";
import { loadQueryOptions } from "~/sanity/loadQueryOptions";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { data } = await loadQuery<SanityDocument[]>(POSTS_QUERY, {}, options);

  return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Posts posts={loaderData.data} />;
}
