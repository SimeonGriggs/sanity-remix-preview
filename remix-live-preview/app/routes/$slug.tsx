// ./app/routes/$slug.tsx

import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { useQuery } from "@sanity/react-loader";

import Post from "~/components/Post";
import { loadQuery } from "~/sanity/loader.server";
import { studioUrl } from "~/sanity/projectDetails";
import { POST_QUERY } from "~/sanity/queries";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<SanityDocument>(POST_QUERY, params, {
    perspective: process.env.SANITY_STUDIO_STEGA_ENABLED ? 'previewDrafts' : 'published',
    stega: process.env.SANITY_STUDIO_STEGA_ENABLED ? {
      enabled: true, studioUrl
    } : false
  });

  return { initial, query: POST_QUERY, params };
};

export default function PostRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  return data ? <Post post={data} /> : null;
}
