// ./app/routes/_index.tsx

import { useLoaderData } from "@remix-run/react";

import { getClient } from "~/lib/sanity";
import Posts from "~/components/Posts";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/sessions";
import { postsQuery } from "~/lib/queries";
import PostsPreview from "~/components/PostsPreview";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("preview");
  const preview = token ? { token } : undefined;
  const posts = await getClient(preview).fetch(postsQuery);

  return { posts, preview };
};

export default function Index() {
  const { posts, preview } = useLoaderData();

  return preview?.token ? (
    <PostsPreview posts={posts} />
  ) : (
    <Posts posts={posts} />
  );
}