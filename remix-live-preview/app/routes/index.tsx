// ./app/routes/index.tsx

import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { PreviewSuspense } from "@sanity/preview-kit";
import { lazy } from "react";
import Posts from "~/components/Posts";
import { client } from "~/lib/sanity";
import { getSession } from "~/sessions";

const PostsPreview = lazy(() => import("../components/PostsPreview"));

export const loader: LoaderFunction = async ({request}: LoaderArgs) => {
  const query = `*[_type == "post" && defined(slug.current)]`;
  const session = await getSession(request.headers.get('Cookie'))
  const preview = session.get('preview')

  // Preview session cookie found, return early and query client-side!
  if (preview) {
    return { preview: true, query };
  }
  
  const posts: SanityDocument[] = await client.fetch(query);

  return { preview: false, posts };
};

export default function PostRoute() {
  const { preview, query, posts } = useLoaderData();

  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PostsPreview query={query} />
    </PreviewSuspense>
  ) : (
    <Posts posts={posts} />
  );
}