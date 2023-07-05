// ./app/routes/$slug.tsx

import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import PostPreview from "~/components/PostPreview";
import { postQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("preview");
  const preview = token ? { token } : undefined;

  const post = await getClient(preview).fetch(postQuery, params);

  return { post, preview };
};

export default function PostRoute() {
  const { post, preview } = useLoaderData();

  return preview?.token ? <PostPreview post={post} /> : <Post post={post} />;
}