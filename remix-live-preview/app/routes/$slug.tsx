// ./app/routes/$slug.tsx

import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { PreviewSuspense } from "@sanity/preview-kit";
import Post from "~/components/Post";
import PostPreview from "~/components/PostPreview";
import { client } from "~/lib/sanity";
import { getSession } from "~/sessions";

export const loader = async ({ params, request }: LoaderArgs) => {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const session = await getSession(request.headers.get('Cookie'))
  const preview = session.get('preview')

  if (preview) {
    return {
      preview: true,
      query,
      params,
    };
  }

  const post: SanityDocument[] = await client.fetch(query, params);

  return { preview: false, post };
};

export default function PostRoute() {
  const { preview, query, params, post } = useLoaderData();

  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PostPreview query={query} params={params} />
    </PreviewSuspense>
  ) : (
    <Post post={post} />
  );
}